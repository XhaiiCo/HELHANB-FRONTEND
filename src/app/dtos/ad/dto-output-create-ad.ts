export interface DtoOutputCreateAd {
  name: string ;
  pricePerNight: number ;
  description: string ;
  numberOfPersons: number ;
  numberOfBedrooms: number;
  street: string ;
  postalCode: number ;
  country: string ;
  city: string ;
  userId: number ;

  arrivalTimeRangeStart: DtoOutputTime ;
  arrivalTimeRangeEnd: DtoOutputTime ;
  leaveTime: DtoOutputTime ;
  features: string[] ;
}

export interface DtoOutputTime{
  hours: number ;
  minutes: number ;
}
