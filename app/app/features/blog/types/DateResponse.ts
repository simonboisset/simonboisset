import { TimeZoneRequest } from './TimeZoneRequest';

export type DateResponse = {
  start: string;
  end: string | null;
  time_zone: TimeZoneRequest | null;
};
