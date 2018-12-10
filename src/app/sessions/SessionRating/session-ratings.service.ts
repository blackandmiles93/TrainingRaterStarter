import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
// import "rxjs/add/operator/map";

export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface ISessionRating {
  userId: number;
  sessionId: number;
  rating: RatingValue; //RatingValue can be a reusable way to change the rating number
  createDate: Date;
}

@Injectable()
export class SessionRatingsService {
  // TODO: Remove this, it is only here to pretend that it is the db rn
  private ratings: ISessionRating[] = [];
  // states: any[];

  constructor(private http: HttpClient) {}

  // getStates(): Observable<any[]> {
  //   if (this.states && this.states.length) {
  //     return Observable.of(this.states);
  //   } else {
  //     this.http
  //       .get<any[]>("where that is")
  //       .do(states => (this.states = states));
  //   }
  // }

  getUserRating(sessionId: number): Observable<number> {
    const ratings = this.ratings
      .filter(rating => rating.sessionId === sessionId)
      .map(rating => rating.rating);

    if (!this.ratings.length) {
      return Observable.of(null);
    }
    return Observable.of(ratings);

  }

  getAvgRating(sessionId: number): Observable<number> {
    const ratings = this.ratings
      .filter(rating => rating.sessionId === sessionId)
      .map(rating: ISessionRating => ratings.rating);

    if (!this.ratings.length) {
      return Observable.of(null);
    }
    const sum = ratings.reduce(
      (previousValue, currentValue) => (currentValue += previousValue)
    );
    const avg = sum / ratings.length;
    return Observable.of(avg);
  }

  getRatings(sessionId: number): Observable<ISessionRating[]> {
    const ratings = this.ratings.filter(
      rating => rating.sessionId === sessionId
    );
    return Observable.of(ratings);
  }

  hasBeenRatedByUser(userId: number, sessionId: number): Observable<boolean> {
    const hasBeenRated = this.ratings.some(
      rating => rating.userId === userId && rating.sessionId === sessionId
    );
    return Observable.of(hasBeenRated);
  }

  save(rating: ISessionRating): Observable<ISessionRating> {
    this.ratings.push(rating);
    console.log([...this.ratings]);
    return Observable.of(rating);
  }
}
