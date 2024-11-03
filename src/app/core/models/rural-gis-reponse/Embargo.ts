import { GeoSpatialBaseIntersection } from "./GeoSpatialBaseIntersection";

export interface Embargo extends GeoSpatialBaseIntersection {
  identificationEmbargoTerm: string;
  embargoIssuanceDate: string; // DateOnly in C# can be represented as a string in ISO format in TypeScript
  nameEmbargoed: string;
  cpfCnpj?: string; // Optional property
  administrativeProcessNumber?: string; // Optional property
  totalEmbargoArea?: string; // Optional property
  inflationActNumber?: string; // Optional property
  infractionDescription?: string; // Optional property
  status: string;
  registrationDate: string; // DateOnly in C# can be represented as a string in ISO format in TypeScript
  legislation?: string; // Optional property
  article?: string; // Optional property
}
