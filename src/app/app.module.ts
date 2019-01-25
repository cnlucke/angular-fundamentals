import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EventsAppComponent} from './events-app.component';
import {RouterModule} from '@angular/router';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivatorService,
  EventsListResolverService,
  EventService,
  CreateSessionComponent,
  SessionListComponent, DurationPipe,
} from './events/index';
import { CollapsibleWellComponent,
  TOASTR_TOKEN, Toastr,
  JQ_TOKEN, SimpleModalComponent,
ModalTriggerDirective} from './common/index';
import {NavbarComponent} from './nav/navbar.component';
import {appRoutes} from './routes';
import {Error404Component} from '../../errors/404.component';
import {AuthService} from './user/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavbarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
  ],
  providers: [EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventRouteActivatorService,
    EventsListResolverService,
    AuthService,
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
