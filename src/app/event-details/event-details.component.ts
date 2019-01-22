import {Component, OnInit} from '@angular/core'
import { EventService} from "../events/shared/event.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image { height: 100px; }
  `]
})
export class EventDetailsComponent implements OnInit {
  event: any;
  constructor(private eventService: EventService, private route:ActivatedRoute) {}

  ngOnInit() {
    console.log('params', this.route.snapshot.params);
    const eventID = this.route.snapshot.params['id'];
    console.log('ID:', eventID, typeof eventID);

    this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  }
}
