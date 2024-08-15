import { User } from "./user.model";

export interface Bus {
    id: string;
    busNumber: string;
    maxSeats: number;
    reservedSeats: number;
    startingDestination: string; // Changed to camelCase
    currentDriver: User;
    state: boolean;
    drivers: User[];
  }