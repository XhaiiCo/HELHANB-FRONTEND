export interface DtoOutputNewReservation {
  renterId: number ;
  arrivalDate: DtoOuputDate ;
  leaveDate: DtoOuputDate ;
}

interface DtoOuputDate{
  year: number ;
  month: number ;
  day: number ;
}
