import { Injectable } from '@angular/core';
import { SignInData } from '../model/signInData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly mockedUser = new SignInData('test@test.test');
  isAuthenticated = false;

  constructor() {

  }

  authenticate(signInData: SignInData): boolean {
    if (this.checkData(signInData)) {
      this.isAuthenticated = true;
      return false
    }
    this.isAuthenticated = false;
    return true
  }

  private checkData(signInData: SignInData): boolean {
    return this.checkEmail(signInData.getEmail())
  }

  private checkEmail(email: string): boolean {
    return email === this.mockedUser.getEmail()
  }
}
