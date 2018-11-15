import { NgModule } from "@angular/core";
import { UserListComponent } from "./user-list/user-list.component";
import { UsersService } from "./users.service";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule],
  providers: [UsersService]
})
export class UsersModule {}
