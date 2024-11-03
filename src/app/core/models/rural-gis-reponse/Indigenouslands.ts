import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";

export interface Indigenouslands extends GeoSpatialBaseIntersection {
  landCode: number;
  landName: string;
  ethnicityName: string;
  indigenousLandCreationPhase: string;
  modality: string;
  adminUnitCode: string;
  adminUnitName: string;
  adminUnitAcronym: string;
}
