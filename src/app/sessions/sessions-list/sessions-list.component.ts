import { Component, OnInit } from "@angular/core";
import { SessionsService } from "../sessions.service";

@Component({
  selector: "app-sessions-list",
  templateUrl: "./sessions-list.component.html",
  styleUrls: ["./sessions-list.component.css"]
})
export class SessionsListComponent implements OnInit {
  sessions = [];
  constructor(private sessionsService: SessionsService) {}

  ngOnInit() {
    this.sessions = this.sessionsService.getSessions();
  }
}
