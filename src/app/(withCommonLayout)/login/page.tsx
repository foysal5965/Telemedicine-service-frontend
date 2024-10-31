'use client'
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { userLogin } from '@/services/actions/user.login';
import { toast } from 'sonner';
import { storeUserInfo } from '@/services/authService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/Providers/AuthProvider';
type ILogin = {
    email: string,
    password: string
}
const LoginPage = () => {
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false)
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ILogin>()
    const onSubmit: SubmitHandler<ILogin> = async (values: ILogin) => {
        try {
            const res = await userLogin(values);
            if (res?.data?.accessToken) {
                toast(res.message, {
                    position: "top-center"
                });

                // Store user information in local storage
                storeUserInfo({ accessToken: res.data.accessToken });

                login(res.data.accessToken);

                // Redirect after successful login
            } else {
                setError(res.message); // Handle error message
            }
        } catch (err: any) {
            console.error(err); // Log the error for debugging
            setError("An unexpected error occurred."); // Show a generic error message
        }
    };




    return (
        <Container
            component={motion.div}
            maxWidth="xs"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            sx={{
                alignItems: 'center',
                justifyContent: 'center',


                padding: '32px', // Padding to provide spacing from edges
                borderRadius: '8px', // Rounded corners for the container
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                marginTop: 20

            }}
        >

            <Typography
                variant="h4"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
            >
                Login to TelHealthCare
            </Typography>

            <Box
                component={motion.form}
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                sx={{
                    width: '100%', // Full width on small screens
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* Email Input */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        {...register("email")}
                    />
                </motion.div>

                {/* Password Input */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <TextField
                        label="Password"
                        type={showNewPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        {...register("password")}


                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </motion.div>
                <Typography variant="body2" sx={{ color: '#4ECDC4', textDecoration: 'underline', cursor: 'pointer' }}>
                    <Link href='/forgot-password' >Forgot Password</Link>
                </Typography>
                {/* Login Button */}

                <Typography align='center' fontWeight={700} color='red'>{error ? error : ''}</Typography>
                <Button
                    component={motion.button}
                    type="submit"
                    variant="contained"
                    fullWidth
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        mt: 2,
                        background: 'linear-gradient(90deg, #4ECDC4, #43B3AC)',
                        padding: '10px 0',
                        color: '#fff',
                        fontWeight: 'bold',
                    }}
                >
                    Login
                </Button>
            </Box>
            {/* Additional Links */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Already have an account? <span className='text-blue-500'><Link href='/register' >Sign Up</Link></span>
                </Typography>

            </Box>
        </Container>
    );
};

export default LoginPage
