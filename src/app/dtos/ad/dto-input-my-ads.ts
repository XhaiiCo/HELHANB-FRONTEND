import {Time} from "@angular/common";

export interface DtoInputMyAds {
  adSlug: string;
  name: string;
  created: Date;
  pricePerNight: number;
  description: string;
  numberOfPersons: number;
  numberOfBedrooms: number;
  street: string;
  postalCode: number;
  country: string;
  city: string;
  arrivalTimeRangeStart: Time;
  arrivalTimeRangeEnd: Time;
  leaveTime: Time;
  features: string[];
  pictures: DtoInputPicture[];
  owner: DtoInputOwner;
  status: DtoInputStatus;
  reservations: DtoInputAdReservation[];

  picturesToAdd: string[];
  picturesToDelete: string[];
}

interface DtoInputPicture {
  id: number;
  path: string;
}

interface DtoInputOwner {
  firstName: string;
  lastName: string;
  profilePicturePath: string;
}

interface DtoInputStatus {
  id: number;
  statusName: string;
}

export interface DtoInputAdReservation {
  id: number;
  arrivalDate: Date;
  leaveDate: Date;
  statusMyAds: DtoInputStatus;
  renterMyAds: DtoInputRenter;
  creation: Date;
}

interface DtoInputRenter {
  id: number;
  firstName: string;
  lastName: string;
  profilePicturePath: string;
}
