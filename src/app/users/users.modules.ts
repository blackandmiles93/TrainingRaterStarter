import { NgModule } from "@angular/core";
import { UserListComponent } from "./user-list/user-list.component";
import { UsersService } from "./users.service";
import { CommonModule } from "@angular/common";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [CommonModule, FormsModule],
  providers: [UsersService]
})
export class UsersModule {}
