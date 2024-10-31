'use client'
import PHForm from "@/components/UI/Form/PHForm";
import PHInput from "@/components/UI/Form/PHInput";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {motion} from 'framer-motion'
import PHSelectField from "@/components/Forms/PHSelectField";
import { Gender } from "@/types";

const doctorSchema = z.object({
    password: z
      .string()
      .min(6, "Password must be at least 8 characters long"),
  
    doctor: z.object({
      name: z.string().nonempty("Name is required"),
      email: z
        .string()
        .email("Invalid email format"),
      contactNumber: z
        .string()
        .regex(/^\d{11}$/, "Please provide a valid phone number!"),
      address: z.string().nonempty("Address is required"),
      registrationNumber: z
        .string()
        .min(5, "Registration number must be at least 5 characters long"),
  
      gender: z.enum(["MALE", "FEMALE"]),
      appointmentFee: z
        .number()
        .positive("Appointment fee must be a positive number"),
      qualification: z.string().nonempty("Qualification is required"),
      currentWorkingPlace: z.string().nonempty("Current working place is required"),
      designation: z.string().nonempty("Designation is required"),
    })
  });
  
  type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
const CreateDoctorPage = () => {
    const [createDoctor] = useCreateDoctorMutation();
    const handleFormSubmit = async (values: FieldValues) => {
        console.log(values);
        // values.doctor.experience = Number(values.doctor.experience);
        // values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
        // const data = modifyPayload(values);
        // try {
        //   const res = await createDoctor(data).unwrap();
        //   console.log(res);
        //   if (res?.id) {
        //     toast.success("Doctor created successfully!!!");
            
        //   }
        // } catch (err: any) {
        //   console.error(err);
        // }
      };
      const defaultValues = {
        doctor: {
          email: "",
          name: "",
          contactNumber: "",
          address: "",
          registrationNumber: "",
          gender: "",
          experience: 0,
          apointmentFee: 0,
          qualification: "",
          currentWorkingPlace: "",
          designation: "",
          profilePhoto: "",
        },
        password: "",
      };
  return (
    <PHForm onSubmit={handleFormSubmit} resolver={zodResolver(doctorSchema)} >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <PHInput label="Name" fullWidth={true} name="doctor.name" />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHSelectField
              items={Gender}
              name="doctor.gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.apointmentFee"
              type="number"
              label="ApointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

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
          Create Doctor
        </Button>
      </PHForm>
  )
};

export default CreateDoctorPage;
