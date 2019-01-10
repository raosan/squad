import { Component, OnInit } from '@angular/core';
import { Member }  from '../member';
import { Members } from '../mock-members';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  
  selectedMember: Member;
  members = Members;

  constructor() { }

  ngOnInit() {
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
  }

}
