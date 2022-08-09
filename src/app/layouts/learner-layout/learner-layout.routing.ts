import { Routes } from '@angular/router';

import { LearnerDashboardComponent } from './LearnerDashboard/LearnerDashboard.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



export const LearnerLayoutRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'dashboard',
        component: LearnerDashboardComponent
    }]},

    {
    path: '',
    children: [ {
      path: 'userprofile',
      component: UserProfileComponent
    }]
    }, {
        path: '',
        children: [ {
            path: 'register',
            component: RegisterCourseComponent
        }]
    },
    { path: 'my-courses',     component: MyCoursesComponent },
];
