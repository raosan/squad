import { Injectable } from '@angular/core';
import { Members } from './mock-members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }

  getMembers() {
    return Members;
  }
}
