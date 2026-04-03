// Manufacturers
export interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  manufacturerUrl: string;
  aliases: string;
  description: string;
}

export const ManufacturerEmpty : Manufacturer = {
  manufacturerId: -1,
  manufacturerName: "",
  manufacturerUrl: "",
  aliases: "",
  description: "",
}

export type Manufacturers = Manufacturer[]

// Users
export interface User {
  userId: number;
  userName: string;
  email: string;
};
 
export type Users = User []
