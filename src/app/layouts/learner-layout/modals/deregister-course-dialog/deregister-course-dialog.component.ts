import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentreService } from 'app/layouts/admin-layout/services/centre.service';

@Component({
  selector: 'app-deregister-course-dialog',
  templateUrl: './deregister-course-dialog.component.html',
  styleUrls: ['./deregister-course-dialog.component.scss']
})
export class DeregisterCourseDialogComponent implements OnInit {
  formDeregister: FormGroup;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DeregisterCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private centreService: CentreService
  ) {}

  ngOnInit() {
    const course = this.data.course;
    console.log(course);
    this.formDeregister = this.fb.group({
      Course: [""],
      CourseCentreId: [""],
      Comments:   ["", Validators.required],
    });
    this.populate();
  }

  populate() {
    const course = this.data.course;
    this.formDeregister.patchValue({
      Course: course.Course,
      CourseCentreId:  course.CourseCentreId,

    })
  }
  onSubmit() {
      this.centreService.Deregister(this.formDeregister.value).subscribe(res => {

        console.log(res);
        //this.Close();
      })
  }
  Close(){
    this.dialog.closeAll();
  }
}