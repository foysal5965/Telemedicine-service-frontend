import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import PHModal from '@/components/UI/PHModal/PHModal';
import PHForm from '@/components/UI/Form/PHForm';
import PHDatePicker from '@/components/Forms/PHDatePicker';
import PHTimePicker from '@/components/Forms/PHTimePicker';
import { FieldValues } from 'react-hook-form';
import { dateFormatter } from '@/utils/dateFormatter';
import { timeFormatter } from '@/utils/timeFormatter';
import { useCreateScheduleMutation } from '@/redux/api/scheduleApi';
import { toast } from 'sonner';
type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
const ScheduleModal = ({ open, setOpen }: TProps) => {
    const [createSchedule] = useCreateScheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    
    
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    // console.log(values);
    try {
      const res = await createSchedule(values)
      
      if (res) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title="Create Schedule">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width: "400px" }}>
          <Grid item md={12}>
            <PHDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <PHDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default ScheduleModal;
