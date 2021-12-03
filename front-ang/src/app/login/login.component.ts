import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }
  submit(): void {
    let body = JSON.stringify(this.form?.getRawValue())
    console.log("body: ", body)
     this.http.post('http://localhost:8080/api/auth/authenticate',this.form?.getRawValue(),
       {withCredentials:false})
       .subscribe((value) => {
         this.router.navigate(['/']);
         // @ts-ignore
         console.log("Iniciaste sesion: ",value['jwt']);
         // @ts-ignore
         sessionStorage.setItem('jwt', value['jwt']);
       });
  }
}
