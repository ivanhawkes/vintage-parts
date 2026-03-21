// Define an interface for the REST API response JSON.
export interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  manufacturerUrl: string;
}

export type Manufacturers = Manufacturer[]

