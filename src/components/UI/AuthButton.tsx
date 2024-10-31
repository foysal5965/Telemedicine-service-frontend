import Link from "next/link";
import { AnimatedButton } from "./animations/animation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/Providers/AuthProvider";
import { removeUser } from "@/services/authService";
import { deleteCookies } from "@/services/actions/deleteCookies";

const AuthButton = () => {
    const { logout, user } = useAuth();

    const router = useRouter();
    const handleLogOut = () => {
        removeUser(); // Clear the token from local storage
        deleteCookies(['accessToken', 'refreshToken'])
        logout();
        router.refresh()// Clear user info from context
        // router.push('/login'); // Redirect to login page if needed
    };
    return (
        <>
            {
                user ? <AnimatedButton
                    onClick={handleLogOut} variant="contained" name='Logout' background='linear-gradient(90deg, #4ECDC4, #43B3AC)' /> : <Link href='/login'><AnimatedButton variant="contained" name='Login' background='linear-gradient(90deg, #4ECDC4, #43B3AC)' /></Link>
            }
        </>
    )
};

export default AuthButton;
