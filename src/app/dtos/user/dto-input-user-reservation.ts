export interface DtoInputUserReservation {
  id: number;
  firstName: string;
  lastName: string;
  profilePicturePath: string | null;
  renterId: number;
  arrivalDate: DtoOuputDate;
  leaveDate: DtoOuputDate;
  reservationDate: DtoOuputDate;
}

export interface DtoOuputDate {
  year: number;
  month: number;
  day: number;
}
