// Manufacturers
export interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  manufacturerUrl: string;
  aliases: string;
  description: string;
}

export type Manufacturers = Manufacturer[]

// Users
export interface User {
  userId: number;
  userName: string;
  email: string;
};
 
export type Users = User []
