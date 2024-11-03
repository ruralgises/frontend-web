import { Alert } from "./Alert";
import { ConservationUnit } from "./ConservationUnit";
import { Deforestation } from "./Deforestation";
import { Embargo } from "./Embargo";
import { GeoSpatialIntersectInformation } from "./GeoSpatialIntersectInformation";
import { Indigenouslands } from "./Indigenouslands";
import { InformationDatabase } from "./InformationDatabase";
import { QuilombolaArea } from "./QuilombolaArea";
import { Settlement } from "./Settlement";
import { UseCoverage } from "./UseCoverage";

export interface RuralProperty {
  themeName: string;
  code: string;
  areaHa: number;
  status: string;
  type: string;
  condition: string;
  informationDatabase: InformationDatabase;
  location?: Location; // Nullable property
  conservationUnits?: GeoSpatialIntersectInformation<ConservationUnit>;
  deforestations?: GeoSpatialIntersectInformation<Deforestation>;
  embargoes?: GeoSpatialIntersectInformation<Embargo>;
  quilombolaAreas?: GeoSpatialIntersectInformation<QuilombolaArea>;
  settlements?: GeoSpatialIntersectInformation<Settlement>;
  useCoverage?: GeoSpatialIntersectInformation<UseCoverage>;
  alert?: GeoSpatialIntersectInformation<Alert>;
  indigenousland?: GeoSpatialIntersectInformation<Indigenouslands>;
}
