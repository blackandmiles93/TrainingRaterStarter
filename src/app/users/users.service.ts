import { Injectable } from "@angular/core";

@Injectable()
export class UsersService {
  users = [
    { FirstName: "Bob", LastName: "Bobberson" },
    { FirstName: "Jo", LastName: "Joeson" },
    { FirstName: "Jim", LastName: "Jimmerson" }
  ];
  constructor() {}

  getUsers(): {}[] {
    return this.users;
  }
}
