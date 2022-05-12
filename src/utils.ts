import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const toastError = (e: AxiosError<{ message: string }>) => {
  if (e.response)
    toast.error(e.response.data.message, {
      draggable: true,
      autoClose: 5000,
    });
};
