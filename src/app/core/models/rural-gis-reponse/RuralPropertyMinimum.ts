import { Geometry } from "geojson";

export interface RuralPropertyMinimum {
  themeName: string;
  code: string;
  areaHa: number;
  status: string;
  type: string;
  condition: string;
  municipio: string;
  geom?: Geometry; // GeoJSON
}
