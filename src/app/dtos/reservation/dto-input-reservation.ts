export interface DtoInputReservation {
  id: number;
  arrivalDate: Date;
  leaveDate: Date;
  picture: string ;
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