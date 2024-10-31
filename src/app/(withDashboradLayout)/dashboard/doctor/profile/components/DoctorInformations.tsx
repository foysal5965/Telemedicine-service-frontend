import { Box, Stack, styled, Typography } from '@mui/material';

const StyledInformationBox = styled(Box)(({ theme }) => ({
   background: '#f4f7fe',
   borderRadius: theme.spacing(1),
   width: '45%',
   padding: '8px 16px',
   '& p': {
      fontWeight: 600,
   },
}));

const DoctorInformation = ({ data }: any) => {
   const docData= data?.data
   console.log(docData.appointmentFee)
   return (
      <>
         <Typography variant='h5' color='primary.main' mb={2}>
            Personal Information
         </Typography>

         <Stack
            direction={{ xs: 'column', md: 'row' }}
            gap={2}
            flexWrap={'wrap'}
         >
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Role
               </Typography>
               <Typography>{docData?.role}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Name
               </Typography>
               <Typography>{docData?.name}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Email
               </Typography>
               <Typography>{docData?.email}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography color='secondary' variant='caption'>
                  Gender
               </Typography>
               <Typography>{docData?.gender}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Designation
               </Typography>
               <Typography>{docData?.designation}</Typography>
            </StyledInformationBox>
         </Stack>

         <Typography variant='h5' my={2} color={'primary.main'}>
            Professional Information
         </Typography>
         <Stack
            direction={{ xs: 'column', md: 'row' }}
            flexWrap={'wrap'}
            gap={2}
         >
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Appointment Fee
               </Typography>
               <Typography>{docData?.appointmentFee} TK</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Qualification
               </Typography>
               <Typography>{docData?.qualification}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Current Working Place
               </Typography>
               <Typography>{docData?.currentWorkingPlace}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Joined
               </Typography>
               <Typography>
                  {data
                     ? new Date(docData.createdAt).toLocaleDateString('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: '2-digit',
                       })
                     : null}
               </Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Current Status
               </Typography>
               <Typography>{docData?.status}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  Average Rating
               </Typography>
               <Typography>{docData?.averageRating}</Typography>
            </StyledInformationBox>
            <StyledInformationBox>
               <Typography variant='caption' color='secondary'>
                  experience
               </Typography>
               <Typography>{docData?.experience} Year</Typography>
            </StyledInformationBox>
         </Stack>
      </>
   );
};

export default DoctorInformation;
