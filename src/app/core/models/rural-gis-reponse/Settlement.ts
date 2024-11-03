import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";

export interface Settlement extends GeoSpatialBaseIntersection {
  codeSIPRA: string;
  nameProject: string;
  familyNumber: number;
  creationDate: string;
  wayObtaining: string;
  dateObtaining: string;
}
