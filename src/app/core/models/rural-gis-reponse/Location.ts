import { InformationDatabase } from "./InformationDatabase";
import { Messoregion } from "./Messoregion";
import { Microregion } from "./Microregion";
import { Municipality } from "./Municipality";

export interface Location {
  municipality?: Municipality; // Optional property
  microregion?: Microregion; // Optional property
  messoregion?: Messoregion; // Optional property
  informationDatabase: InformationDatabase;
}
