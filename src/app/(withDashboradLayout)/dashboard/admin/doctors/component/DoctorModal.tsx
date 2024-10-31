import { Box, Button, Grid, Typography } from "@mui/material";
import { Gender } from "@/types/common";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import PHFullScreenModal from "@/components/shared/PHModal/PHFullScreenModal";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHInput from "@/components/UI/Form/PHInput";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from 'framer-motion';

const doctorSchema = z.object({
  password: z.string().min(6, "Password must be at least 8 characters long"),
  doctor: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format"),
    contactNumber: z.string().regex(/^\d{11}$/, "Please provide a valid phone number!"),
    address: z.string().nonempty("Address is required"),
    registrationNumber: z.string().min(5, "Registration number must be at least 5 characters long"),
    gender: z.enum(["MALE", "FEMALE"]),
    qualification: z.string().nonempty("Qualification is required"),
    currentWorkingPlace: z.string().nonempty("Current working place is required"),
    designation: z.string().nonempty("Designation is required"),
    experience: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Experience must be a positive number",
    }),
    appointmentFee: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Appointment fee must be a positive number",
    }),
  })
});

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const methods = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      doctor: {
        email: "",
        name: "",
        contactNumber: "",
        address: "",
        registrationNumber: "",
        gender: "",
        experience: 0,
        appointmentFee: 0,
        qualification: "",
        currentWorkingPlace: "",
        designation: "",
        profilePhoto: "",
      },
      password: "",
    },
  });

  const { handleSubmit, formState } = methods;
  const { errors } = formState;

  const [createDoctor] = useCreateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values)
    // values.doctor.experience = Number(values.doctor.experience);
    // values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
    
    const data = modifyPayload(values);
    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.data?.id) {
        toast.success("Doctor created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Typography variant="h4" gutterBottom>Create Doctor Profile</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <PHInput label="Name" fullWidth={true} name="doctor.name" error={!!errors?.doctor?.name} helperText={errors?.doctor?.name?.message} />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.email" type="email" label="Email" fullWidth={true} error={!!errors?.doctor?.email} helperText={errors?.doctor?.email?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="password" type="password" label="Password" fullWidth={true} error={!!errors.password} helperText={errors.password?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.contactNumber" label="Contact Number" fullWidth={true} error={!!errors?.doctor?.contactNumber} helperText={errors?.doctor?.contactNumber?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.address" label="Address" fullWidth={true} error={!!errors?.doctor?.address} helperText={errors?.doctor?.address?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
              error={!!errors?.doctor?.experience} helperText={errors?.doctor?.experience?.message}
            />
          </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.registrationNumber" label="Registration Number" fullWidth={true} error={!!errors?.doctor?.registrationNumber} helperText={errors?.doctor?.registrationNumber?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHSelectField items={Gender} name="doctor.gender" label="Gender" error={!!errors?.doctor?.gender} helperText={errors?.doctor?.gender?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.appointmentFee" type="number" label="Appointment Fee" fullWidth={true} error={!!errors?.doctor?.appointmentFee} helperText={errors?.doctor?.appointmentFee?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.qualification" label="Qualification" fullWidth={true} error={!!errors?.doctor?.qualification} helperText={errors?.doctor?.qualification?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.currentWorkingPlace" label="Current Working Place" fullWidth={true} error={!!errors?.doctor?.currentWorkingPlace} helperText={errors?.doctor?.currentWorkingPlace?.message} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput name="doctor.designation" label="Designation" fullWidth={true} error={!!errors?.doctor?.designation} helperText={errors?.doctor?.designation?.message} />
            </Grid>

            <Grid item xs={12}>
              <Button component={motion.button} type="submit" variant="contained" color="primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </PHFullScreenModal>
  );
};

export default DoctorModal;
