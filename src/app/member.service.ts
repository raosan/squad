import { Injectable } from '@angular/core';
import { Members } from './mock-members';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  getMembers(): Observable<Member[]> {
    return of(Members);
  }
}
