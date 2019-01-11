import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
			{ id: 1, name: 'Nico' },
			{ id: 2, name: 'Raosan' },
			{ id: 3, name: 'Arif' },
			{ id: 4, name: 'Sajudin' },
			{ id: 5, name: 'Dino' },
			{ id: 6, name: 'Syafaat' },
			{ id: 7, name: 'Fany' },
			{ id: 8, name: 'Haerul' },
			{ id: 9, name: 'Fachry' },
    ];
    return {members};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(members: Member[]): number {
    return members.length > 0 ? Math.max(...members.map(member => member.id)) + 1 : 11;
  }
}