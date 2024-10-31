
import { authKey } from '@/constants/authKey';
import setAccessToken from '@/services/actions/setAccessToken';
import { getNewAccessToken } from '@/services/authService';
import { IGenericErrorResponse, ResponseSuccessType } from '@/types';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import axios, { AxiosResponse } from 'axios';
import router from 'next/router';
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      const accessToken = getFromLocalStorage(authKey);

      if (accessToken) {
         config.headers.Authorization = accessToken;
      }
      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
instance.interceptors.response.use(
   //@ts-ignore
   function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const responseObject: ResponseSuccessType = {
         data: response.data.data,
         meta: response.data.meta,
      };
      return {
         ...response,
         data: responseObject,
      } as AxiosResponse<ResponseSuccessType>;
   },
   async function (error) {

      const config = error.config;
      if (error?.response?.status === 500 && !config.sent) {
         config.sent = true;
         try {
            const response = await getNewAccessToken();
            const accessToken = response?.data?.data?.accessToken;
            config.headers['Authorization'] = accessToken;
            setToLocalStorage(authKey, accessToken);
            setAccessToken(accessToken);
            return instance(config);
         } catch (refreshError) {
             // If refresh fails, log out the user
             console.error('Failed to refresh access token', refreshError);

             // Clear authentication data
             removeFromLocalStorage(authKey);
             setAccessToken(null); // Assuming setAccessToken clears token globally
             router.push('/login'); // Adjust path if needed
             return Promise.reject(refreshError);
         }
      }
      const responseObject: IGenericErrorResponse = {
         statusCode: error?.response?.data?.statusCode || 500,
         message:
            error?.response?.data?.message || 'Something went wrong!!!',
         errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return Promise.reject(responseObject);

   }
);

export { instance };
