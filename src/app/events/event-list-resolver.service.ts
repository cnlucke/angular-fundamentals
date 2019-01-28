import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import {EventService} from './shared/index';

@Injectable()
export class EventListResolverService implements Resolve<any> {

  constructor(private eventService: EventService) {
  }

  resolve() {
    return this.eventService.getEvents();
  }
}
