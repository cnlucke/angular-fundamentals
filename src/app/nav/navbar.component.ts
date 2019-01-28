import { Component, OnInit } from '@angular/core';
import {AuthService} from '../user/auth.service';
import {EventService, IEvent, ISession} from "../events/shared";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #F97924; }
  `]
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';
  foundSessions: ISession[];
  events: IEvent[];

  constructor(public authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events.sort((a, b) => a.name.localeCompare(b.name));
    })
  }

  searchSessions(searchTerm: any) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}

