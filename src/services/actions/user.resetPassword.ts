// "use server";

import { FieldValues } from 'react-hook-form';
import setAccessToken from './setAccessToken';

export const userResetPassword = async (data: FieldValues) => {

   const res = await fetch(
      `http://localhost:5000/api/v1/auth/reset-password`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
      }
   );

   const userInfo = await res.json()
 
   return userInfo
};
