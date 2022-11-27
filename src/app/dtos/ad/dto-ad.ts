export interface DtoAd {
  id: number,
  name: string,
  created: string,
  pricePerNight: number,
  description: string,
  numberOfPersons: number,
  numberOfBedrooms: number,
  street: string,
  postalCode: number,
  country: string,
  city: string,
  adStatusId: number,
  arrivalTimeRangeStart: string,
  arrivalTimeRangeEnd: string,
  leaveTime: string,
  features: string[],
  pictures: {
    id: number,
    path: string
  }[],
  owner: {
    firstName: string,
    lastName: string
    profilePicturePath: string,
  }
}

//manque reservation mais on en pas encore donc pas mis
