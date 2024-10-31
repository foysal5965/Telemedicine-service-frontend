import {jwtDecode} from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ['/login', '/register'];
const commonPrivateRoutes = [
  
   '/dashboard/change-password',
   '/doctors',
   'video'
   
];
const roleBasedPrivateRoutes = {
   PATIENT: [/^\/dashboard\/patient/],
   DOCTOR: [/^\/dashboard\/doctor/],
   ADMIN: [/^\/dashboard\/admin/],
   SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Retrieve access token from cookies
   const accessToken = cookies().get('accessToken')?.value;

   console.log("Pathname:", pathname);
   console.log("Access Token:", accessToken);

   // Redirect to login if access token is missing and not on auth route
   if (!accessToken) {
      if (AuthRoutes.includes(pathname)) {
         return NextResponse.next();
      } else {
         console.log("No access token found, redirecting to /login");
         return NextResponse.redirect(new URL('/login', request.url));
      }
   }

   // Allow access to common private routes if token is present
   if (
      accessToken &&
      (commonPrivateRoutes.includes(pathname) ||
         commonPrivateRoutes.some((route) => pathname.startsWith(route)))
   ) {
      console.log("Accessing a common private route, proceeding");
      return NextResponse.next();
   }

   // Decode the token to retrieve role, with error handling
   let decodedData = null;
   try {
      decodedData = jwtDecode(accessToken) as any;
      console.log('decodeData',decodedData)
   } catch (error) {
      console.error('Invalid JWT token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
   }

   const role = decodedData?.role;
   console.log("Decoded role from token:", role);

   // Verify if the role is authorized to access its specific routes
   if (role && roleBasedPrivateRoutes[role as Role]) {
      const allowedRoutes = roleBasedPrivateRoutes[role as Role];
      
      // If the route matches any allowed route for the role, proceed
      if (allowedRoutes.some((route) => pathname.match(route))) {
         console.log(`Access allowed for role: ${role} on route: ${pathname}`);
         return NextResponse.next();
      } else {
         console.log(`Access denied for role: ${role}, redirecting to /dashboard/${role.toLowerCase()}`);
         // Redirect unauthorized access to the role’s default dashboard or home page
         return NextResponse.redirect(new URL(`/dashboard/${role.toLowerCase()}`, request.url));
      }
   }

   console.log("Redirecting to /login due to invalid role or missing role-based routes");
   // Redirect to login if role is invalid or undefined
   return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
   matcher: ['/login', '/register', '/dashboard/:page*', '/doctors/:page*'],
};
