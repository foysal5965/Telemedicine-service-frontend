'use client'
import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid,
    Typography,
    IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useDeleteSpecialtyMutation, useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import { useDebounced } from '@/redux/hooks';
import Loader from '@/components/shared/Loading';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import SpecialtyModal from './component/SpecialtyModal';
import { toast } from 'sonner';

const SpecialtiesPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newSpecialty, setNewSpecialty] = useState()
    const [deleteSpecialty] = useDeleteSpecialtyMutation();
    // Use the debounced search term instead of the immediate one
    
    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });

    // Add the debounced term to the query, not the immediate searchTerm
    const query: Record<string, any> = {};
    if (debouncedTerm) {
        query["searchTerm"] = debouncedTerm;
    }

    // Fetch the data using the query
    const { data: specialties, isLoading } = useGetAllSpecialtiesQuery(query);

    // Handle delete action (dummy handler for now)
    const handleDelete = async (id: string) => {
        try {
          const res = await deleteSpecialty(id).unwrap();
          if (res?.id) {
            toast.success("Specialty deleted successfully!!!");
          }
        } catch (err: any) {
          console.error(err.message);
        }
      };

    // Table row animation variants
    const rowVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    };

    // Display loading spinner while data is being fetched
    if (isLoading) {
        return <Loader />;
    }
const handleModal = (data:any)=>{
    setIsModalOpen(true)
    setNewSpecialty(data)
}
    return (
        <Box sx={{ p: 3 }}>
            {/* Title */}
            <Typography variant="h4" gutterBottom>
                Specialties
            </Typography>
            <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} specialty={newSpecialty} />
            {/* Search Bar and Create Button */}
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 3 }}
            >
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Search Specialties"
                        variant="outlined"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href='/dashboard/admin/specialties/create'>
                        <Button variant="contained" color="primary">
                            Create Specialty
                        </Button>
                    </Link>
                </Grid>
            </Grid>

            {/* Specialties Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Icon</TableCell>
                            <TableCell align='center'>Specialty Name</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {specialties?.data?.data?.map((specialty: {
                            icon: string; id: string, title: string
                        }, index: number) => (
                            <motion.tr
                                key={specialty.id}
                                initial="hidden"
                                animate="visible"
                                variants={rowVariants}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <TableCell><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image   src={specialty.icon} width={30} height={30} alt="icon" />
                                </Box></TableCell>
                                <TableCell align='center'>{specialty.title}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="secondary"
                                        onClick={()=>handleModal(specialty)}
                                        component={motion.button}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleDelete(specialty.id)}
                                        component={motion.button}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SpecialtiesPage;
