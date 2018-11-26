import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IUsers, UsersService } from "../users.service";

@Component({
  templateUrl: "./user-detail.component.html"
})
export class UserDetailComponent implements OnInit {
  user: IUsers;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    console.log("init begins");
    let id: string | number = this.route.snapshot.paramMap.get("userId");
    //make sure that this id is a number and if it is not, convert it to 0
    id = isNaN(parseInt(id)) ? 0 : parseInt(id);

    //new
    this.user = {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      createdAt: "",
      updatedAt: ""
    };
    console.log(this.user);
    console.log("init ended");
  }

  save(): void {
    if (!this.formValid()) {
      return;
    }
    this.usersService.save(this.user).subscribe(user => {
      //add a success message
      this.router.navigate(["users"]);
    });
  }

  private formValid(): boolean {
    return this.user.email && this.user ? true : false;
  }

  cancel(): void {
    this.router.navigate(["users"]);
  }
}
