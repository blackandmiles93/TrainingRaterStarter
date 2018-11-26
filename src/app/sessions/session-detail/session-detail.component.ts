import { Component, OnInit } from "@angular/core";
import { SessionsService, ISession } from "../sessions.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: "./session-detail.component.html"
})
export class SessionDetailComponent implements OnInit {
  session: ISession;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionsService
  ) {}

  ngOnInit() {
    console.log("init begins");
    let id: string | number = this.route.snapshot.paramMap.get("sessionId");
    //make sure that this id is a number and if it is not, convert it to 0
    id = isNaN(parseInt(id)) ? 0 : parseInt(id);
    if (id) {
      //get from db
      console.log("get from db");
      this.sessionsService.getSessionById(id).subscribe(session => {
        const startTime = new Date(session.startTime);
        startTime.setHours(
          startTime.getHours() - startTime.getTimezoneOffset() / 60
        );
        session.startTime = startTime.toISOString().slice(0, 16);
        this.session = session;
      });
    } else {
      //new
      this.session = {
        id: 0,
        name: "",
        location: "",
        startTime: new Date().toISOString().slice(0, 16),
        createdAt: "",
        updatedAt: ""
      };
    }
    console.log(this.session);
    console.log("init ended");
  }

  save(): void {
    if (!this.formValid()) {
      return;
    }
    this.sessionsService.save(this.session).subscribe(session => {
      //add a success message
      this.router.navigate(["sessions"]);
    });
  }

  private formValid(): boolean {
    return this.session.name && this.session ? true : false;
  }

  cancel(): void {
    this.router.navigate(["sessions"]);
  }
}
