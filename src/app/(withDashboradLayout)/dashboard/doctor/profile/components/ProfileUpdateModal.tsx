/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import {
   useGetDoctorQuery,
   useUpdateDoctorMutation,
} from '@/redux/api/doctorApi';
import { FieldValues } from 'react-hook-form';
import { Button, Grid, Box } from '@mui/material';
import PHSelectField from '@/components/Forms/PHSelectField';
import { Gender } from '@/types';
import MultipleSelectChip from './MultipleSelectChip';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PHFullScreenModal from '@/components/shared/PHModal/PHFullScreenModal';
import PHForm from '@/components/UI/Form/PHForm';
import PHInput from '@/components/UI/Form/PHInput';
import Loader from '@/components/shared/Loading';
import { motion } from 'framer-motion';
type TProps = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   id: string;
};
const validationSchema = z.object({
   experience: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
   ),
   appointmentFee: z.preprocess(
      (x) => (x ? x : undefined),
      z.coerce.number().int().optional()
   ),
   name: z.string().optional(),
   contactNumber: z.string().optional(),
   registrationNumber: z.string().optional(),
   gender: z.string().optional(),
   qualification: z.string().optional(),
   currentWorkingPlace: z.string().optional(),
   designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }:TProps) => {
   const { data, refetch, isSuccess, isLoading: doctorLoading } = useGetDoctorQuery(id);
   const doctorData = data?.data;
//@ts-ignore
   const { data: allSpecialties } = useGetAllSpecialtiesQuery(undefined);

   const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);
   const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

   useEffect(() => {
      if (!isSuccess) return;
      setSelectedSpecialtiesIds(
         doctorData?.DoctorSpecialties.map((sp:any) => sp.specialtiesId)
      );
   }, [isSuccess]);

   if (doctorLoading) {
      return <Loader />;
   }

   const submitHandler = async (values: FieldValues) => {
      const specialties = selectedSpecialtiesIds.map((specialtiesId) => ({
         specialtiesId,
         isDeleted: false,
      }));
      const excludedFields = [
         'email', 'id', 'role', 'needPasswordChange', 'status', 'createdAt', 
         'updatedAt', 'isDeleted', 'averageRating', 'review', 'profilePhoto', 
         'registrationNumber', 'schedules', 'doctorSpecialties',
      ];

      const updatedValues = Object.fromEntries(
         Object.entries(values).filter(([key]) => !excludedFields.includes(key))
      );
      updatedValues.specialties = specialties;

      try {
         updateDoctor({ body: updatedValues, id });
         await refetch();
         setOpen(false);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <PHFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
         <PHForm
            onSubmit={submitHandler}
            resolver={zodResolver(validationSchema)}
            defaultValues={doctorData}
         >
            <Grid container spacing={2} sx={{ my: 5 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
               {[
                  { name: 'name', label: 'Name' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'contactNumber', label: 'Contact Number' },
                  { name: 'address', label: 'Address' },
                  { name: 'registrationNumber', label: 'Registration Number' },
                  { name: 'experience', label: 'Experience', type: 'number' },
                  { name: 'gender', label: 'Gender', select: true, items: Gender },
                  { name: 'appointmentFee', label: 'Appointment Fee', type: 'number' },
                  { name: 'qualification', label: 'Qualification' },
                  { name: 'currentWorkingPlace', label: 'Current Working Place' },
                  { name: 'designation', label: 'Designation' },
               ].map((field, index) => (
                  <Grid
                     key={field.name}
                     item
                     xs={12}
                     sm={12}
                     md={4}
                     component={motion.div}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                     {field.select ? (
                        <PHSelectField
                           items={field.items}
                           name={field.name}
                           label={field.label}
                           sx={{ mb: 2 }}
                           fullWidth
                        />
                     ) : (
                        <PHInput
                           name={field.name}
                           type={field.type || 'text'}
                           label={field.label}
                           sx={{ mb: 2 }}
                           fullWidth
                        />
                     )}
                  </Grid>
               ))}
               <Grid item xs={12} sm={12} md={4}>
                  <MultipleSelectChip
                     allSpecialties={allSpecialties?.data?.data}
                     selectedIds={selectedSpecialtiesIds}
                     setSelectedIds={setSelectedSpecialtiesIds}
                  />
               </Grid>
            </Grid>

            <Box display="flex" justifyContent="center" mt={3}>
               <Button
                  type="submit"
                  disabled={updating}
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                     px: 4,
                     py: 1.5,
                     fontSize: '1rem',
                     color: 'white',
                     backgroundColor: 'primary.main',
                  }}
               >
                  Save
               </Button>
            </Box>
         </PHForm>
      </PHFullScreenModal>
   );
};

export default ProfileUpdateModal;
