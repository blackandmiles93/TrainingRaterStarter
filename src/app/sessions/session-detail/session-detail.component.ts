import { Component, OnInit } from "@angular/core";
import { SessionsService, ISession } from "../sessions.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";

@Component({
  templateUrl: "./session-detail.component.html"
})
export class SessionDetailComponent implements OnInit {
  session: ISession;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionsService: SessionsService,
    private toastsManager: ToastsManager
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
        updatedAt: "",
        averageRating: 0,
        uRating: null
      };
    }
    console.log(this.session);
    console.log("init ended");
  }

  save(): void {
    if (!this.formValid()) {
      this.toastsManager.error("Form Invalid");
      return;
    }
    this.sessionsService.save(this.session).subscribe(session => {
      this.toastsManager.success("Session Saved");
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
