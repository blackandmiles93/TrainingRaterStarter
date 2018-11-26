import { Component, OnInit } from "@angular/core";
import { UsersService, IUsers } from "../users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.less"]
})
export class UserListComponent implements OnInit {
  users: IUsers[] = [];
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => (this.users = users));
  }

  goToAdd(): void {
    this.router.navigate(["users/add"]);
  }

  goToEdit(id: number): void {
    this.router.navigate([`users/${id}`]);
  }
}
