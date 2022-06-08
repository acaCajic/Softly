import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-toastify';

dayjs.extend(relativeTime);

export const toastError = (e: AxiosError<{ message: string }>) => {
  if (e.response)
    toast.error(e.response.data.message, {
      draggable: true,
      autoClose: 5000,
    });
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    draggable: true,
    autoClose: 5000,
  });
};

export const prepareDifferenceLabel = (now: Date, dateString: string) => {
  return dayjs(dateString).fromNow().toString();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  toastError,
  toastSuccess,
};
