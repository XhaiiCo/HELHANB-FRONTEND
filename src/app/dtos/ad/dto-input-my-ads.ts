import {Time} from "@angular/common";
import {ImgData} from "../../interfaces/img-data";

export interface DtoInputMyAds {
  id: number;
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
  reservations: DtoInputReservation[];

  picturesToAdd: ImgData[];
  picturesToDelete: string[];
  nbImg: number;
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

interface DtoInputReservation {
  arrivalDate: Date;
  leaveDate: Date;
  status: DtoInputStatus;
  renter: DtoInputRenter;
}

interface DtoInputStatus {
  id: number;
  statusName: string;
}

interface DtoInputRenter {
  id: number;
  firstName: string;
  lastName: string;
}
