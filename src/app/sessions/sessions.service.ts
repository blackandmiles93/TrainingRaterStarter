import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// import "rxjs/add/operator/map";

export interface ISession {
  id: number;
  name: string;
  location: string;
  startTime: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class SessionsService {
  constructor(private http: HttpClient) {}

  getSessions(): Observable<ISession[]> {
    return this.http.get<ISession[]>("http://localhost:5000/sessions");
    // map over sessions and convert time zone to wherever someone is accessing it from
    // .map(sessions => {
    //   sessions.forEach(session => {
    //     const startTime = new Date(session.startTime);
    //     startTime.setHours(
    //       startTime.getHours() - startTime.getTimezoneOffset() / 60
    //     );
    //     session.startTime = startTime.toISOString();
    //   });
    //   return sessions;
    // })
  }

  getSessionById(id: number): Observable<ISession> {
    return this.http.get<ISession>(`http://localhost:5000/sessions/${id}`);
  }

  save(session: ISession): Observable<ISession | number[]> {
    if (session.id) {
      return this.http.put<number[]>(`http://localhost:5000/sessions`, session);
    } else {
      return this.http.post<ISession>(
        `http://localhost:5000/sessions`,
        session
      );
    }
  }
}
