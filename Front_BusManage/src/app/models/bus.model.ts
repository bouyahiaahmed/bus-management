import { User } from "./user.model";

export interface Bus {
  id: string;
  busNumber: string;
  maxSeats: number;
  reservedSeats: number;
  starting_destination: string; // Changed to camelCase
  currentDriver: User;
  state: boolean;
  passengers: User[];
  departureDate: string; // or Date if you prefer to use JavaScript Date objects
  departureTime: string; // or Date if you prefer to use JavaScript Date objects
}
