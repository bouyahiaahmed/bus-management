import { User } from "./user.model";

export interface Bus {
    id: string;
    busNumber: string;
    maxSeats: number;
    reservedSeats: number;
    startingDestination: string; // Changed to camelCase
    plate: string;
    currentDriver: User;
    state: boolean;
    drivers: User[];
  }