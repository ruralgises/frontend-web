import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";

export interface QuilombolaArea extends GeoSpatialBaseIntersection {
  processNumber: string;
  communityName: string;
  familyNumber: number;
  decreeDate: string;
  realm: string;
  phase: string;
  responsible: string;
}
