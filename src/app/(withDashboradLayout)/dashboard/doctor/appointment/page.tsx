'use client'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "../schedules/components/MultipleSelectFieldChip";
import Link from "next/link";



// Columns for DataGrid
const columns = [
  { field: "patient.name", headerName: "Patient Name", flex: 1 },
  { field: "contactNumber", headerName: "Contact Number", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 1 },
  { field: "paymentStatus", headerName: "Payment Status", flex: 1 },
  {
    field: "join",
    headerName: "Join",
    flex: 1,
    renderCell: (params:any) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert(`Joining appointment with ID: ${params.id}`)}
      >
        Join
      </Button>
    ),
  },
];

const DoctorAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  console.log(data)
  //@ts-ignore
  const appointments = data?.appointments?.data?.data;
  // console.log(appointments)
  // const newDate = dateFormatter(appointments);
   const meta = data?.meta;
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
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
          mb: { xs: 2, sm: 3, md: 4 }, // Responsive margin bottom
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          color: "text.primary",
          fontWeight: "bold",
          textAlign: "center", // Center text on small screens
        }}
      >
        Doctor Appointments
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: { xs: "100%", sm: 600, md: 800 }, // Responsive max width
          width: "100%",
          overflowX: "auto", // Allow horizontal scroll on small screens
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Payment Status</TableCell>
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
                <TableCell>{appointment.patient.name}</TableCell>
                <TableCell>{appointment.patient.contactNumber}</TableCell>
                <TableCell>{dateFormatter(appointment.schedule.startDateTime)}</TableCell>
                <TableCell>{getTimeIn12HourFormat(appointment.schedule.startDateTime)}</TableCell>
                <TableCell>{appointment.paymentStatus}</TableCell>
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

export default DoctorAppointmentsPage;
