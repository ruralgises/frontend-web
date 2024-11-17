import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";

export interface Alert extends GeoSpatialBaseIntersection {
  codeAlert: number;
  detectDate: string; // DateOnly in C# can be represented as a string in ISO format in TypeScript
  publicationDate: string; // DateOnly in C# can be represented as a string in ISO format in TypeScript
  vectorPressure: string;
  font: string;
  detectYear: number;
}
