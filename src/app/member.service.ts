import { Injectable } from '@angular/core';
import { Members } from './mock-members';
import { Member } from './member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MemberService {
  constructor(
  	private http: HttpClient,
  	private messageService: MessageService,
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
  }

  private membersUrl = 'api/members';  // URL to web api

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getMembers(): Observable<Member[]> {
  	// TODO: send the message _after_ fetching the heroes
  	return this.http.get<Member[]>(this.membersUrl)
  		.pipe(
  			tap(_ => this.log('fetched members tap')),
	      catchError(this.handleError('getMembers', []))
	    );
  }

  /** GET hero by id. Will 404 if id not found */
  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Member>(`getMember id = ${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addMember (member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl, member, httpOptions).pipe(
      tap((member: Member) => this.log(`added member w/ id = ${member.id}`)),
      catchError(this.handleError<Member>('addMember'))
    );
  }

  /** PUT: update the hero on the server */
  updateMember (member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member, httpOptions).pipe(
      tap(_ => this.log(`updated member id = ${member.id}`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteMember (member: Member | number): Observable<Member> {
    const id = typeof member === 'number' ? member : member.id;
    const url = `${this.membersUrl}/${id}`;


    return this.http.delete<Member>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted member id = ${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

}
