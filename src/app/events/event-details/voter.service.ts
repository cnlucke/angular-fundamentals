import { Injectable } from '@angular/core';
import {ISession} from "../shared";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  addVoter(eventId: number, session: ISession, voterName: string) {
    session.voters.push(voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    let options = { headers: new HttpHeaders({'ContentType': 'application/json'}) };
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe(); //self-subscribe so http call is made, but no one wants results
  }

  deleteVoter(eventId: number, session: ISession, voterName: string) {
    session.voters = session.voters.filter(voter => voter !== voterName)
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url)
      .pipe(catchError(this.handleError('deleteVoter')))
      .subscribe();
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some(voter => voter === voterName)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T)
    }
  }

}
