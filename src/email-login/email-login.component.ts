import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['moganesi@yahoo.com', [Validators.required, Validators.email]],//moganesi@yahoo.com
      password: ['9220897mo', [Validators.minLength(6), Validators.required] ]//9220897mo
    })
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {

        await this.afAuth.signInWithEmailAndPassword(email, password);

    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
    this.router.navigate(['/timesheet'])
  }

}
