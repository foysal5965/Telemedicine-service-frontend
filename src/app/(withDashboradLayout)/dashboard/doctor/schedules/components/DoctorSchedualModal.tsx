import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useGetAllSchedulesQuery } from '@/redux/api/scheduleApi';
import { Button, Stack } from '@mui/material';
import { useCreateDoctorScheduleMutation } from '@/redux/api/doctorScheduleApi';
import PHModal from '@/components/UI/PHModal/PHModal';
import MultipleSelectFieldChip from './MultipleSelectFieldChip';
import Loader from '@/components/shared/Loading';

type TProps = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorScheduleModal = ({ open, setOpen }: TProps) => {
   const [selectedDate, setSelectedDate] = useState(
      dayjs(new Date()).toISOString()
   );

   const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

   const query: Record<string, any> = {};

   if (!!selectedDate) {
      query['startDate'] = dayjs(selectedDate)
         .hour(0)
         .minute(0)
         .millisecond(0)
         .toISOString();
      query['endDate'] = dayjs(selectedDate)
         .hour(23)
         .minute(59)
         .millisecond(999)
         .toISOString();
   }

   const { data, isLoading: dataLoading } = useGetAllSchedulesQuery(query);

   //@ts-ignore
   const schedules = data?.schedules.data?.data
   const [createDoctorSchedule, { isLoading }] =
      useCreateDoctorScheduleMutation();



   const onSubmit = async () => {
      try {
         const res = await createDoctorSchedule({
            scheduleIds: selectedScheduleIds,
         });
         console.log(res);
         setOpen(false);
      } catch (error) {
         console.log(error);
      }
   };
   if (dataLoading) {
      return <Loader />
   }
   return (
      <PHModal open={open} setOpen={setOpen} title='Create Doctor Schedule'>
         <Stack direction={'column'} gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
                  label='Controlled picker'
                  value={dayjs(selectedDate)}
                  onChange={(newValue) =>
                     setSelectedDate(dayjs(newValue).toISOString())
                  }
                  sx={{ width: '100%' }}
               />
            </LocalizationProvider>
            <MultipleSelectFieldChip
               schedules={schedules}
               selectedScheduleIds={selectedScheduleIds}
               setSelectedScheduleIds={setSelectedScheduleIds}
            />

            <Button onClick={onSubmit}>
               submit
            </Button>
         </Stack>
      </PHModal>
   );
};

export default DoctorScheduleModal;
