import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SignInData } from '../model/signInData';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  profileForm: FormGroup;
  maxDate = new Date()

  deviceObjects = [
    { name: 'Angular' },
    { name: 'React' },
    { name: 'Veu' }];
  frameworkV = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }

  unselected = true;
  hobbiesCheck = true

  constructor(private fb: FormBuilder, private AuthService: AuthService) {
    this.profileForm = this.fb.group({
      firstName: ['',],
      lastName: [''],
      dateOfBirth: [''],
      framework: [''],
      frameworkVersion: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      hobbies: this.fb.array([
      ], Validators.minLength(2))
      // hobbies: this.fb.array([
      //   this.fb.control('')
      // ], Validators.minLength(2))
    })
  }

  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray
  }

  addHobby() {
    const hobby = this.fb.group({
      type: [],
      duration: []
    })
    this.hobbies.push(hobby);
    this.hobbiesCheck = false
  }
  deleteHobby(i: number) {
    this.hobbies.removeAt(i)
  }
  // var today: string | null = new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd")

  formatDate(date: string) {
    var d = this.profileForm.value.dateOfBirth,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [day, month, year].join('-');

  }
  selectedDeviceObj: any;
  onChangeObj(newArr: any) {
    this.unselected = false
    this.selectedDeviceObj = newArr.value
  }
  private checkData(emailData: string) {
    const signInData = new SignInData(emailData)
    if (!this.AuthService.authenticate(signInData)) {
      setTimeout(() => {
        alert('email already existing')
      }, 2000);

    }
  }
  submitInfo(data: any) {
    let userInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      // dateOfBirth: this.formatDate(data.dateOfBirth),
      framework: data.framework.key,
      frameworkVersion: data.frameworkVersion,
      email: data.email,
      hobby: data.hobbies
    }
    console.log(userInfo)
  }

  onSubmit() {
    // this.formatDate(this.profileForm.value.dateOfBirth)
    if (!this.profileForm.valid) return
    this.checkData(this.profileForm.value.email)
    this.submitInfo(this.profileForm.value)
    // TODO: Use EventEmitter with form value
  }
}


