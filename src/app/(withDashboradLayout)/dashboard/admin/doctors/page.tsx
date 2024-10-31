'use client'
import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, TextField, IconButton, Typography, Box,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import { useGetAllDoctorsQuery } from '@/redux/api/doctorApi';
import { useDebounced } from '@/redux/hooks';
import DoctorModal from './component/DoctorModal';
import Link from 'next/link';
import { Edit } from '@mui/icons-material';

const doctorsList = [
    { id: 1, name: 'Dr. Alice Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. John Doe', specialty: 'Neurology' },
    { id: 3, name: 'Dr. Emily Clark', specialty: 'Pediatrics' },
    // Add more doctors here if needed
];

const DoctorsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });

    // Add the debounced term to the query, not the immediate searchTerm
    const query: Record<string, any> = {};
    if (debouncedTerm) {
        query["searchTerm"] = debouncedTerm;
    }
    const { data: doctors } = useGetAllDoctorsQuery({...query})
    // @ts-ignore
    const doctorData= doctors?.doctors?.data


    const handleDelete = (id: any) => {
        // setDoctors(doctors.filter(doctor => doctor.id !== id));
    };



    return (
        <Box sx={{ padding: 2 }}>
        {/* Title with animation */}
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Doctors</Typography>
        </motion.div>

        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />

        {/* Search and Create Buttons with animation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <TextField
                label="Search Doctors"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="contained"
                    color="primary"
                >
                    Create Doctor
                </Button>
            </motion.div>
        </Box>

        {/* Table with Animation */}
        <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>Specialty</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <AnimatePresence>
                        {doctorData?.map((doctor: any) => (
                            <motion.tr
                                key={doctor.id}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <TableCell align='center'>{doctor.name}</TableCell>
                                <TableCell align='center'>{doctor.specialty}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="error" onClick={() => handleDelete(doctor.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Link href={`/dashboard/admin/doctors/edit/${doctor.id}`}>
                                    <IconButton > 
                                        <Edit />
                                    </IconButton></Link>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    );
};

export default DoctorsPage;
