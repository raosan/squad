import { Injectable } from '@angular/core';
import { Members } from './mock-members';
import { Member } from './member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private messageService: MessageService) { }

  getMembers(): Observable<Member[]> {
  	// TODO: send the message _after_ fetching the heroes
  	this.messageService.add('HeroService: fetched heroes');
    return of(Members);
  }
}
