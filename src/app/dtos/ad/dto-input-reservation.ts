export interface DtoInputReservation {
  id: number;
  arrivalDate: Date;
  leaveDate: Date;
  renter: {
    id: number;
    firstName: string;
    lastName: string;
  };
  ad: {
    id: number;
    name: string;
  };
  reservationStatus: {
    id: number;
    statusName: string;
  };
}
