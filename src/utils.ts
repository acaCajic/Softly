import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const MILLISECONDS_IN_HOURS = 1000 * 60 * 60;
const MILLISECONDS_IN_MINUTES = 1000 * 60;
const MILLISECONDS_IN_SECONDS = 1000;

export const toastError = (e: AxiosError<{ message: string }>) => {
  if (e.response)
    toast.error(e.response.data.message, {
      draggable: true,
      autoClose: 5000,
    });
};

export const prepareDifferenceLabel = (
  now: Date,
  dateString: string,
  counter: number,
) => {
  const milliseconds =
    +new Date(dateString) - +now - counter * MILLISECONDS_IN_SECONDS;

  const hours = Math.floor(milliseconds / MILLISECONDS_IN_HOURS);

  const minutes = Math.floor(
    (milliseconds - hours * MILLISECONDS_IN_HOURS) / MILLISECONDS_IN_MINUTES,
  );

  const seconds = Math.ceil(
    (milliseconds -
      hours * MILLISECONDS_IN_HOURS -
      minutes * MILLISECONDS_IN_MINUTES) /
      MILLISECONDS_IN_SECONDS,
  );
  return `${hours} hours ${minutes} min ${seconds} sec`;
};
