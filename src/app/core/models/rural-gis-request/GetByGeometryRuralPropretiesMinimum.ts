import { Geometry } from "geojson";

export interface GetByGeometryRuralPropretiesMinimum {
  geometry: Geometry;
  skip?: number | null;
  take?: number | null;
}
