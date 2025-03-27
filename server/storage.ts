// Remove ContactMessage types from import
import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Removed createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  // Removed getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  // Removed private contactMessages: Map<number, ContactMessage>;
  private userCurrentId: number;
  // Removed private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    // Removed this.contactMessages = new Map();
    this.userCurrentId = 1;
    // Removed this.messageCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Removed async createContactMessage(...) { ... }

  // Removed async getContactMessages(...) { ... }
}

export const storage = new MemStorage();
