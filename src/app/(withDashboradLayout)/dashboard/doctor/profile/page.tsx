'use client';

import { useGetMYProfileQuery, useUpdateMYProfileMutation } from '@/redux/api/myProfile';
import { Box, Button, Container, Grid, Avatar } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import DoctorInformation from './components/DoctorInformations';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutoFileUploader from '@/components/UI/Form/AutoFileUploader';
import Loader from '@/components/shared/Loading';
import { motion } from 'framer-motion';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const query = {};
    const { data, isLoading } = useGetMYProfileQuery(query);
    const doctorData = data?.data;

    const [updateMYProfile, { isLoading: updating }] = useUpdateMYProfileMutation();

    const fileUploadHandler = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}));

        updateMYProfile(formData);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={data?.data?.id} />
            <Container sx={{ mt: { xs: 2, md: 4 } }}>
                <Grid container spacing={4}>
                    {/* Profile Image Section */}
                    <Grid item xs={12} md={4}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            sx={{
                                height: { xs: 200, md: 300 },
                                width: '100%',
                                overflow: 'hidden',
                                borderRadius: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {doctorData?.profilePhoto ? (
                                <Image
                                    height={300}
                                    width={400}
                                    src={doctorData.profilePhoto}
                                    alt="User Photo"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            ) : (
                                <Avatar
                                    sx={{
                                        height: { xs: 200, md: 300 },
                                        width: { xs: 200, md: 300 },
                                        fontSize: { xs: 50, md: 100 },
                                    }}
                                    alt="User Avatar"
                                >
                                    {doctorData?.name?.[0] || 'U'}
                                </Avatar>
                            )}
                        </Box>

                        {/* File Upload and Edit Button */}
                        <Box my={3} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            {updating ? (
                                <p>Uploading...</p>
                            ) : (
                                <AutoFileUploader
                                    name="file"
                                    label="Choose Your Profile Photo"
                                    icon={<CloudUploadIcon />}
                                    onFileUpload={fileUploadHandler}
                                    variant="text"
                                />
                            )}
                        </Box>

                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            fullWidth
                            endIcon={<ModeEditIcon />}
                            onClick={() => setIsModalOpen(true)}
                            sx={{ mt: 2 }}
                        >
                            Edit Profile
                        </Button>
                    </Grid>

                    {/* Profile Information Section */}
                    <Grid item xs={12} md={8}>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <DoctorInformation
                                data={data}
                                component={motion.div}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Profile;
