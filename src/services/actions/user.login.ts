// "use server";

import { FieldValues } from 'react-hook-form';
import setAccessToken from './setAccessToken';

export const userLogin = async (data: FieldValues) => {

   const res = await fetch(
      `http://localhost:5000/api/v1/auth/login`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
         credentials: 'include',
      }
   );

   const userInfo = await res.json()
 


   if (userInfo.success === true) {
      const passwordChangeRequired = userInfo.data.needPasswordChange;
      setAccessToken(userInfo.data.accessToken, {
         redirect: '/dashboard',
         passwordChangeRequired,
      });
   }

   return userInfo
};
