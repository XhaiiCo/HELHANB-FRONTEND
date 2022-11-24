export interface DtoInputCreateAd {
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

  arrivalTimeRangeStart: Date ;
  arrivalTimeRangeEnd: Date ;
  leaveTime: Date ;
  features: string[] ;
  owner: DtoInputOwner ;
}

interface DtoInputOwner{
  firstName: string ;
  lastName: string ;
  profilePicturePath: string ;
}
