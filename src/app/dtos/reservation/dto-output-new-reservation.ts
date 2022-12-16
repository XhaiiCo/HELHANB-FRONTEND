export interface DtoOutputNewReservation {
  adSlug: string,
  arrivalDate: DtoOuputDate ;
  leaveDate: DtoOuputDate ;
}

interface DtoOuputDate{
  year: number ;
  month: number ;
  day: number ;
}
