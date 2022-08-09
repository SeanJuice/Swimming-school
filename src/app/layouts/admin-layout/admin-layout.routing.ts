import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { AdminDashboardComponent } from "./AdminDashboard/AdminDashboard.component";
import { CentreComponent } from "./centre/centre.component";
import { CourseComponent } from "./course/course.component";
import { LearnersComponent } from "./learners/learners.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { RegisteredLearnersComponent } from "./registered-learners/registered-learners.component";
import { SubjectComponent } from "./subject/subject.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: AdminDashboardComponent,
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "notifications",
        component: NotificationsComponent,
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "learners",
        component: LearnersComponent,
      },
    ],
  },

  { path: "courses", component: CourseComponent },
  { path: "subjects", component: SubjectComponent },
  { path: "centres", component: CentreComponent },
  { path: "registered-learners", component: RegisteredLearnersComponent },

];
