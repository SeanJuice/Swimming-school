import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { ToastrService } from 'app/services/Toastr.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {

  selectedstudenttype;
  selectedsubject;
  selectedcourse;
  subjects =[];
  courses: any[] =  [];
  centres: any[] =  [];

  registerModel: FormGroup;


  constructor(private course: CourseService, private auth: AuthService, private fb: FormBuilder, private toast: ToastrService, private router: Router) {
    this.getCentres();
    this.getCourses(this.auth.getUserType);
   }



  ngOnInit() {

    this.registerModel = this.fb.group({
      CourseId: ['', Validators.required],
      CentreId: ['', Validators.required],
      userId: [this.auth.getUserID],

    });

console.log(this.auth.getUserID)
  }

  onSubmit() {

    console.log(this.registerModel.valid)
    console.log(this.registerModel.value)
       if(this.registerModel.valid)
       {
         this.registerModel.patchValue({ userId: this.auth.getUserID})
         this.course.register(this.registerModel.value).subscribe(
           (res: any) => {
               this.registerModel.reset();
               console.log(res)
               if(res.Message === 'centre')
               {
                 this.toast.showNotification("can't register on more than one centre",4);
               } else if(res.Message === 'number') {
                this.toast.showNotification("course is full",4);

               }
               else {
                this.toast.showNotification("successfully enrolled in the course",1);

               }
               this.router.navigateByUrl('../learner/my-courses');
           },
           err => {
             console.log(err);
           }
         );

       }

     }

  getCourses(id) {
    this.course.getCourses(id).subscribe((courses) => {
      this.courses =  courses;
      console.log(this.courses)
    })
  }

  getCentres() {
    this.course.getCentres().subscribe((centres) => {
      this.centres =  centres;
      console.log(this.centres)
    })
  }
}
