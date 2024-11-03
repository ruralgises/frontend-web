import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";

export interface ConservationUnit
  extends GeoSpatialBaseIntersection {
  ucName: string;
  category: string;
  group: string;
  realm: string;
  yearCreation: string;
  actCreation: string;
  cnucCode: string;
  managingBody: string;
}
