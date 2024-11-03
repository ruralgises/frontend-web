import { InformationDatabase } from "./InformationDatabase";

export interface GeoSpatialInformation<T> {
  values: T[];
  informationDatabase: InformationDatabase;
}
