'use client'
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Typography,
    TablePagination,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetAllSchedulesQuery } from '@/redux/api/scheduleApi';
import { ISchedule } from '@/types/schedule';
import dayjs from 'dayjs';
import { useDebounced } from '@/redux/hooks';
import Loader from '@/components/shared/Loading';
import { format } from 'date-fns';
import ScheduleModal from '../../admin/schedules/component/ScheduleModal';
import { useGetAllDoctorSchedulesQuery } from '@/redux/api/doctorScheduleApi';
import DoctorScheduleModal from './components/DoctorSchedualModal';

const SchedulePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0); // 0-based index for frontend
    const [rowsPerPage, setRowsPerPage] = useState(10); // Initially set to meta.limit or default

    // Prepare the query with debounced search term, page, and limit
    const query = {
        searchTerm: debouncedTerm || undefined,
        page: currentPage + 1, // Send 1-based index to backend
        limit: rowsPerPage,
    };

    const { data, isLoading } = useGetAllDoctorSchedulesQuery({ ...query });

    //@ts-ignore
    const schedules = data?.doctorSchedules?.data || [];

    //@ts-ignore
    const meta = data?.doctorSchedules?.meta

    const total = meta?.total || 0;
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;

    const allSchedule = schedules.map((schedule: ISchedule, index: number) => ({
        sl: index + 1 + currentPage * rowsPerPage,
        id: schedule.id,
        startDate: format(new Date(schedule.schedule.startDateTime), 'yyyy-MM-dd'),
        // endDate: format(new Date(schedule.endDateTime), 'yyyy-MM-dd'),
        startTime: dayjs(schedule.schedule.startDateTime).format('hh:mm a'),
        endTime: dayjs(schedule.schedule.endDateTime).format('hh:mm a'),
    }));

    if (isLoading) {
        return <Loader />;
    }

    // Pagination Handlers
    const handleChangePage = (event: any, newPage: number) => {
        setCurrentPage(newPage); // Update the page
    };

    const handleChangeRowsPerPage = (event: any) => {
        const newLimit = parseInt(event.target.value, 10);
        setRowsPerPage(newLimit); // Update rows per page
        setCurrentPage(0); // Reset to first page
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Schedule
            </Typography>
            <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <TextField
                    label="Search Schedule"
                    variant="outlined"
                    sx={{ flex: 1, mr: 2 }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Schedule
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sl</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <AnimatePresence>
                        <TableBody>
                            {allSchedule.map((schedule: any) => (
                                <motion.tr
                                    key={schedule.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                >
                                    <TableCell>{schedule.sl}</TableCell>
                                    <TableCell>{schedule.startDate}</TableCell>
                                    <TableCell>{schedule.startTime}</TableCell>
                                    <TableCell>{schedule.endTime}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </AnimatePresence>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={total} // Total number of items from backend
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
            />
        </Box>
    );
};

export default SchedulePage;
