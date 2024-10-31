'use client'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedButton } from '../../animations/animation';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';

const Specialist =  () => {
    const query= {}
    const {data:specialties}= useGetAllSpecialtiesQuery({...query})


    return (
        <Container>
            <Box
                sx={{
                    margin: { xs: '40px 0px', md: '80px 0px' }, // Adjust margin for smaller screens
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        textAlign: { xs: 'center', md: 'center' }, // Center text on small screens
                    }}
                >
                    <Typography variant='h4' fontWeight={600} fontSize={{ xs: '1.75rem', md: '2.125rem' }}>
                        Explore Treatments Across Specialties
                    </Typography>
                    <Typography component='p' fontWeight={300} fontSize={{ xs: 16, md: 18 }} mt={1}>
                        Experienced Doctors Across All Specialties
                    </Typography>
                </Box>

                <Grid 
                    container
                    spacing={4} // Spacing between grid items
                    mt={5}
                    justifyContent='center'
                >
                    {specialties?.data?.data?.slice(0, 6).map((specialty: any) => (
                        <Grid item xs={6} sm={4} md={2} key={specialty.id}> {/* Adjust grid column sizes */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                initial={{ x: '-100vw' }} // Start from outside the viewport (left side)
                                animate={{ x: 0 }}        // Animate to the default position (center)
                                transition={{ type: 'spring', stiffness: 60 }} // Smooth spring animation
                            >
                                <Card sx={{ maxWidth: '100%' }}>
                                    <CardContent>
                                        <Box
                                            component={Link}
                                            href={`/doctors?specialties=${specialty.title}`}
                                            sx={{
                                                flex: 1,
                                                textAlign: 'center',
                                                padding: '40px 10px',
                                                '& img': {
                                                    width: { xs: '100px', md: '140px' }, // Adjust image size
                                                    height: { xs: '50px', md: '70px' },
                                                    margin: '0 auto',
                                                },
                                            }}
                                        >
                                            <Image
                                                src={specialty.icon}
                                                width={100}
                                                height={100}
                                                alt='specialty icon'
                                            />
                                        </Box>
                                        <Box>
                                            <Typography
                                                component='p'
                                                fontWeight={600}
                                                fontSize={{ xs: 16, md: 18 }} // Adjust font size for responsiveness
                                                mt={2}
                                            >
                                                {specialty.title}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ py: '20px', textAlign: 'center' }}>
                    <AnimatedButton
                        variant='outlined'
                        color='black'
                        name='View All'
                        borderColor='linear-gradient(90deg, #4ECDC4, #FF6B6B)'
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Specialist;
