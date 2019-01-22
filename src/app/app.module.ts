import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {EventsAppComponent} from './events-app.component';
import {RouterModule} from "@angular/router";
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivatorService,
  EventsListResolverService,
  EventService,
} from './events/index'
import {ToastrService} from "./common/toastr.service";
import {NavbarComponent} from './nav/navbar.component';
import {appRoutes} from "./routes";
import {Error404Component} from "../../errors/404.component";

@NgModule({
  imports: [
    BrowserModule,
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
  ],
  providers: [EventService,
    ToastrService,
    EventRouteActivatorService,
    EventsListResolverService,
    {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}],
  bootstrap: [EventsAppComponent]
})
export class AppModule {
}

export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true;
}
