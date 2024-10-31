'use server';

import { authKey } from '@/constants/authKey';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const setAccessToken = (token: string |null, option?: any) => {
   cookies().set(authKey, token as string);
   if (option && option.passwordChangeRequired) {
      redirect('/dashboard');
   }
   if (option && !option.passwordChangeRequired && option.redirect) {
      redirect(option.redirect);
   }
};

export default setAccessToken;
