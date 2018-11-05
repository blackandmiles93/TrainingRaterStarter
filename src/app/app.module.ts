import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SessionsService } from "./sessions/sessions.service";
import { SessionsListComponent } from "./sessions/sessions-list/sessions-list.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserListComponent } from "./users/user-list/user-list.component";
import { UsersService } from "./users/users.service";

@NgModule({
  declarations: [
    AppComponent,
    SessionsListComponent,
    HomeComponent,
    UserListComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgbModule],
  providers: [SessionsService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
