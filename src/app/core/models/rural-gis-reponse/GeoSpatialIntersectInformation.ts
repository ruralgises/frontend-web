import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";
import { GeoSpatialInformation } from "./GeoSpatialInformation";

export interface GeoSpatialIntersectInformation<
  T extends GeoSpatialBaseIntersection
> extends GeoSpatialInformation<T> {
  areaIntersectTotalHa: number;
  percentageOfThePropertyAreaTotal: number;
}
