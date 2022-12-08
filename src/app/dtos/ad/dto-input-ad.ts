import {Time} from "@angular/common";

export interface DtoInputAd {
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
  adSlug: string;
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
