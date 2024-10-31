'use client'
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { modifyPayload } from '@/utils/modifyPayload';
import { registerPatient } from '@/services/actions/registerPateint';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/services/actions/user.login';
import { storeUserInfo } from '@/services/authService';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PHForm from '@/components/UI/Form/PHForm';
import PHInput from '@/components/UI/Form/PHInput';
import { useAuth } from '@/lib/Providers/AuthProvider';
type Ipatient = {
    email: string
    contactNumber: string,
    name: string,
    address: string
}
type IPatientData = {
    patient: Ipatient,
    password: string
}
export const patientValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    contactNumber: z
        .string()
        .regex(/^\d{11}$/, "Please provide a valid phone number!"),
    address: z.string().min(1, "Please enter your address!"),
});

export const validationSchema = z.object({
    password: z.string().min(6, "Must be at least 6 characters"),
    patient: patientValidationSchema,
});
export const defaultValues = {
    password: "",
    patient: {
        name: "",
        email: "",
        contactNumber: "",
        address: "",
    },
};
const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IPatientData>({
        resolver: zodResolver(validationSchema),
        defaultValues
    })
    const router = useRouter()
    const { login } = useAuth();
    const [error, setError] = useState('')
    const handleRegister = async (values: FieldValues) => {
        const data = modifyPayload(values)
        try {
            const res = await registerPatient(data);

            if (res?.data?.id) {
                toast.success('Signup successfully', {position:'top-center'});
                const result = await userLogin({
                    password: values.password,
                    email: values.patient.email,
                });
                // console.log(result)
                if (result?.data?.accessToken) {
                    storeUserInfo({ accessToken: result?.data?.accessToken });
                    login(result?.data?.accessToken);
                    router.push("/");
                }
            } else {
                setError(res.message)
            }
        } catch {

        }

    }

    return (
        <Container
            component={motion.div}
            maxWidth="xs"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: 3, // Add shadow for depth
            }}
        >
            <Typography
                variant="h4"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: '#333' }}
            >
                Register
            </Typography>

            <Box
                component={motion.form}
                onSubmit={handleSubmit(handleRegister)}

                sx={{
                    width: '100%',
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* Name Input */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        {...register("patient.name")}
                    />
                </motion.div>

                {/* Email Input */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        {...register("patient.email")}
                    />
                </motion.div>

                {/* Password Input */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <TextField
                        label="password"
                        type='password'
                        variant="outlined"
                        fullWidth
                        {...register("password")}
                    />
                </motion.div>

                {/* Contact Number Input */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <TextField
                        label="Contact Number"
                        variant="outlined"
                        fullWidth
                        {...register("patient.contactNumber")}
                    />
                </motion.div>

                {/* Address Input */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                >
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        {...register("patient.address")}
                    />
                </motion.div>
                <Typography align='center' fontWeight={700} color='red'>{error ? error : ''}</Typography>
                {/* Register Button */}
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
                        borderRadius: '5px',
                    }}
                >
                    Register
                </Button>
            </Box>

            {/* Already have an account? */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#333' }}>
                    Already have an account?
                    <Link href="/login" sx={{ color: '#4ECDC4', textDecoration: 'underline', cursor: 'pointer' }}>
                        Log In
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;
