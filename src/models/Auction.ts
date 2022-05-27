export type Auction = {
  _id: string;
  startDate: string;
  endDate: string;
};

/**
 * const diff = +new Date(endDate) - +new Date(startDate) -> razlika u milisekundama
 * diff / 1000 / 60 / 60 / 24
 *
 */
