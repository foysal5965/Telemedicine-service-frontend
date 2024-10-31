'use client';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import { AnimatedButton } from '../../animations/animation';
import { motion } from 'framer-motion';
import { useGetAllDoctorsQuery } from '@/redux/api/doctorApi';
import Loader from '@/components/shared/Loading';

const TopRatedDoctors = () => {
    const query = {};
    const { data, isLoading } = useGetAllDoctorsQuery({ ...query })

    if (isLoading) {
        return <Loader />
    }
    const doctors = data?.doctors || [];
    return (
        <Box
            sx={{
                my: 10,
                py: { xs: 10, md: 30 }, // Adjust padding for smaller screens
                backgroundColor: 'rgba(20, 20, 20, 0.1)',
                clipPath: 'polygon(0 0, 100% 25%, 100% 100%, 0 75%)',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' component='h1' fontWeight={700} fontSize={{ xs: '1.75rem', md: '2.125rem' }}>
                    Our Top Rated Doctors
                </Typography>
                <Typography component='p' fontSize={{ xs: 16, md: 18 }} fontWeight={400} sx={{ mt: 2 }}>
                    Access to expert physicians and surgeons, advanced technologies
                </Typography>
                <Typography component='p' fontSize={{ xs: 16, md: 18 }} fontWeight={400}>
                    and top-quality surgery facilities right here.
                </Typography>
            </Box>

            <Container sx={{ margin: '30px auto' }}>
                <Grid container spacing={4}>
                    {doctors?.data?.data?.map((doctor: any) => (
                        <Grid item xs={12} sm={6} md={4} key={doctor.id}> {/* Responsive grid columns */}
                            <motion.div
                                initial={{ x: '-100vw' }} // Start from outside the viewport (left side)
                                animate={{ x: 0 }}         // Animate to the default position
                                transition={{ type: 'spring', stiffness: 60 }} // Smooth spring animation
                            >
                                <Card sx={{ height: '100%' }}> {/* Ensure card fills available height */}
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: { xs: 250, md: 300 }, // Adjust image height for smaller screens
                                            '& img': {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            },
                                        }}
                                    >
                                        <Image
                                            src={doctor.profilePhoto}
                                            alt='doctor'
                                            width={500}
                                            height={100}
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant='h5'
                                            component='div'
                                        >
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {doctor.qualification}, {doctor.designation}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary' mt={1}>
                                            <LocationOnIcon /> {doctor.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions
                                        sx={{
                                            justifyContent: 'space-between',
                                            px: 2,
                                            paddingBottom: '20px',
                                        }}
                                    >
                                        <AnimatedButton name='Book Now' color='black'>Book Now</AnimatedButton>
                                        <AnimatedButton name='View Profile' variant='outlined' color='black'>View Profile</AnimatedButton>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', py: '20px' }}>
                    <AnimatedButton
                        component={Link}
                        href='/doctors'
                        variant='outlined'
                        name='View All'
                        color='black'
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;
