import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '@/utils/local-storage';
import { JwtPayload } from 'jwt-decode';
import { authKey } from '@/constants/authKey';
import { decodedToken } from '@/utils/jwt/jwt';

const useUserInfo = () => {
   const [userInfo, setUserInfo] = useState<any | string>('');

   const fetchUserInfo = () => {
      const authToken = getFromLocalStorage(authKey);
      if (authToken) {
         const decodedData: JwtPayload & { role: any } = decodedToken(authToken);
         const userInfo: any = {
            ...decodedData,
            role: decodedData.role?.toLowerCase() || '',
         };
         setUserInfo(userInfo);
      } else {
         setUserInfo('');
      }
   };

   useEffect(() => {
      fetchUserInfo();

      // Optional: Listen for storage changes if needed
      const handleStorageChange = (event: StorageEvent) => {
         if (event.key === authKey) {
            fetchUserInfo();
         }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
         window.removeEventListener('storage', handleStorageChange);
      };
   }, []);

   return userInfo;
};

export default useUserInfo;
