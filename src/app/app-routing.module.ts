import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SessionsListComponent } from "./sessions/sessions-list/sessions-list.component";
import { NgModule } from "@angular/core";
import { UserListComponent } from "./users/user-list/user-list.component";
import { SessionDetailComponent } from "./sessions/session-detail/session-detail.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { AuthGuard } from "./common/auth/auth.guard";
import { LoginComponent } from "./common/auth/login.component";

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  {
    path: "sessions",
    component: SessionsListComponent,
    canActivate: [AuthGuard]
  },
  { path: "sessions/:sessionId", component: SessionDetailComponent },
  { path: "users", component: UserListComponent },
  { path: "users/:userId", component: UserDetailComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {}
