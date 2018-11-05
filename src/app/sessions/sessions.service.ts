import { Injectable } from "@angular/core";

@Injectable()
export class SessionsService {
  sessionsMock = [
    { Name: "John Teaches Angular", Location: "Miles-U 1" },
    { Name: "Scott Teaches AWS", Location: "Miles-U 2" },
    { Name: "Jack Teaches PODIS", Location: "Jacks Desk" }
  ];
  constructor() {}

  getSessions(): {}[] {
    return this.sessionsMock;
  }
}
