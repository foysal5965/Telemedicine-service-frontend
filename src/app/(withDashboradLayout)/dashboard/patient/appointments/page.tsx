'use client';
import { useGetMyAppointmentsQuery } from '@/redux/api/appointmentApi';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import VideocamIcon from '@mui/icons-material/Videocam';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { getTimeIn12HourFormat } from '../../doctor/schedules/components/MultipleSelectFieldChip';

const PatientAppointmentsPage = () => {
   const { data, isLoading } = useGetMyAppointmentsQuery({});
   
   const meta = data?.meta;
//@ts-ignore
const appointments = data?.appointments?.data?.data;
   

   return (
      <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        variant="h4"
        sx={{
          mb: { xs: 2, sm: 3, md: 4 },
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          color: "text.primary",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        My Appointments
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: { xs: "100%", sm: 600, md: 800 },
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments?.map((appointment:any) => (
              <TableRow
                component={motion.tr}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={appointment.id}
              >
                <TableCell>{appointment.doctor.name}</TableCell>
                <TableCell>{dateFormatter(appointment.schedule.startDateTime)}</TableCell>
                <TableCell>{getTimeIn12HourFormat(appointment.schedule.startDateTime)}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                <Link href={`/video?videoCallingId=${appointment?.videoCallingId}`}><Button
                    variant="contained"
                    color="primary"
                    size="small" 
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" }, // Responsive font size for button
                      padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" }, // Responsive padding
                    }}
                  >
                    Join
                  </Button></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
   );
};

export default PatientAppointmentsPage;
