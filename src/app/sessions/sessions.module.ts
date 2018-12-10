import { NgModule } from "@angular/core";
import { SessionsListComponent } from "./sessions-list/sessions-list.component";
import { SessionsService } from "./sessions.service";
import { CommonModule } from "@angular/common";
import { SessionDetailComponent } from "./session-detail/session-detail.component";
import { FormsModule } from "@angular/forms";
import { SessionRatingComponent } from "./SessionRating/session-rating.component";
import { SessionRatingsService } from "./SessionRating/session-ratings.service";

@NgModule({
  declarations: [
    SessionsListComponent,
    SessionDetailComponent,
    SessionRatingComponent
  ],
  imports: [CommonModule, FormsModule],
  providers: [SessionsService, SessionRatingsService]
})
export class SessionsModule {}
