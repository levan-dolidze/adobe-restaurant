import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ValidationsService } from 'src/app/validations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService,

    private validations: ValidationsService) { }
  homeForm: FormGroup;

  ngOnInit(): void {
    this.createFormInstance()

  }

  createFormInstance() {
    this.homeForm = new FormGroup({
      user: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'),
      ValidationsService.customValidation]),
      pass: new FormControl(null, [Validators.required])
    })


  }

  submitForm(): any {
    const form = this.homeForm.get('user')
    if (form?.hasError('required') &&
      form?.touched &&
      form?.dirty) {
      return 'required'
    }
 
    else if (form?.hasError('customEmailValidation') &&
      form?.touched &&
      form?.dirty) {
      return 'are y ok?'
    }

  }

}
