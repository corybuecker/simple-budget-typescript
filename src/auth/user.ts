import { Express } from "express";

export class AuthUser implements Express.User {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId
  }
}
