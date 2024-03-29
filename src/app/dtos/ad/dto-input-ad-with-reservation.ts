export interface DtoInputAdWithReservation {
  adSlug: string,
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
    id: number;
    firstName: string,
    lastName: string
    profilePicturePath: string,
  }

  reservations: {
    arrivalDate: Date,
    leaveDate: Date,
  }[],
}

