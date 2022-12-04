import {DtoOutputTime} from "./dto-output-time";

export interface DtoOutputUpdateAd
{
  id: number,
  name: string,
  numberOfPersons: number,
  numberOfBedrooms: number,
  description: string,
  pricePerNight: number,
  arrivalTimeRangeStart: DtoOutputTime,
  arrivalTimeRangeEnd: DtoOutputTime,
  leaveTime: DtoOutputTime,
  features: string[],
  picturesToAdd: string[],
  picturesToDelete: string[]
}
