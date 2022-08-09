import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'app/shared/Document.service';
import { Document, DocumentList } from 'app/shared/models/Document.model';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

interface company {
  value: any;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userTypes: any[] = [];
  companies: company[] = [
    { value: 1, viewValue: 'at a registered school' },
    { value: 0, viewValue: 'writing a supplementary exam' }
  ];
  isSelected: boolean = false;
  Yes: Boolean | undefined;


  UploadedFiles: any[] = [];
  Documents: Document[] = [];
  MaxFileSize: number = 1048576;
  DocListToShow: any;

  get(data: { value: any; }) {
    this.isSelected = true;
    if (data.value == 1) {
      this.Yes = true;
    } else if (data.value == 0) {
      this.isSelected = false;
      this.formModel.patchValue({ isAtSchool: data.value })
      this.formModel.patchValue({ SchoolName: data.value })
      this.Yes = false;
    }
    else {
    }
  }


  formModel: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private DocumentService: DocumentService) { }

  ngOnInit() {
    this.getUserTypes();
    this.formModel = this.fb.group({
      FirstName: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', Validators.required],
      isAtSchool: ['', Validators.required],
      SchoolName: ['', Validators.required],
      UserTypeId: ['', Validators.required],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })

    });
  }
  onSubmit() {

    console.log(this.formModel.valid)
    console.log(this.formModel.value)
    if (this.formModel.valid) {
      if (this.Documents.length > 0) {

        this.Documents[0].UserId = this.auth.getUserID;


        this.auth.register(this.formModel.value).pipe(switchMap(data => {

          return this.DocumentService.UploadDocument(new DocumentList(this.Documents)).pipe(map(innerData => [data, innerData]))
        })).subscribe(
          (res: any) => {
            this.formModel.reset();
            this.router.navigate(['/login']);
            this.UploadedFiles = [];
            this.Documents = [];
            alert(res.innerData.message);
            this.DocListToShow = res.innerData.Data;
          },
          error => {
            this.UploadedFiles = [];
            this.Documents = [];
            alert(error);
          }
        );

      }

    }

  }

  getUserTypes() {

    this.auth.getTypes().subscribe(res => {
      console.log(res);
      this.userTypes = res;
    })
  }


  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }


  handleFileInput(event) {
    //clear existing added files
    this.UploadedFiles = [];
    this.Documents = [];

    if (event.target.files && event.target.files.length > 0 && event.target.files.length < 6) {
      //user can add upto 5 files
      for (let index = 0; index < event.target.files.length; index++) {
        if (event.target.files[index].size < this.MaxFileSize) {
          // Add file to list of files if file is less then 1 MB
          this.UploadedFiles.push(event.target.files[index]);
        }
        else {
          alert('File size should be less than 1 MB');
        }
      }
    }
    else {
      alert('Please enter minimum 1 and maximum 5 files');
    }
    for (let index = 0; index < this.UploadedFiles.length; index++) {
      let Doc = new Document();
      //Setting Document information
      Doc.DocumentName = this.UploadedFiles[index].name;
      Doc.ContentType = this.UploadedFiles[index].type;
      let fileReader = new FileReader();
      fileReader.onload = () => {
        //pushing Document in the Documents array once file is uploaded
        Doc.DocumentContent = fileReader.result.toString();
        this.Documents.push(Doc);
      }
      // Reading data from file to Filereader
      fileReader.readAsDataURL(this.UploadedFiles[index]);
    }
  }

  // onSubmit() {
  //   if (this.Documents.length > 0) {
  //     this.DocumentService.UploadDocument(new DocumentList(this.Documents)).subscribe(
  //       data => {
  //         this.UploadedFiles = [];
  //         this.Documents = [];
  //         alert(data.message);
  //         this.DocListToShow = data.Data;
  //       },
  //       error => {
  //         this.UploadedFiles = [];
  //         this.Documents = [];
  //         alert(error);
  //       }
  //     );
  //   }
  //   else {
  //     alert("please enter document first.");
  //   }
  // }

}
