export interface InformationDatabase {
  databaseName: string;
  lastUpdate: string; // DateOnly as string in ISO format
  isOfficial: boolean;
}