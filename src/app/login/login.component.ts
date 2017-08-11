import { AfterViewInit,  Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  formErrors = {
    'name': '',
    'password': ''
  };
  validationMessages = {
    'name': {
      'required': '这是必填项！',
      'minlength': '最小长度是4',
      // 'maxlength': '最大长度是50'
    },
    'password': {
      'required': '这是必填项！',
      'minlength': '最小长度是6',
    }
  };
  ngAfterViewInit(): void {}

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(4)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],

    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data) {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.loginForm.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }

}


