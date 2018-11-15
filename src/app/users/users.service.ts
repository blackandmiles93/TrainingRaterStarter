import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export interface IUsers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UsersService {
  users: IUsers[] = [];
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>("http://localhost:5000/users");
  }
}
