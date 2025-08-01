import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCredentials, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  //membersFromHome = input.required<User[]>();
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCredentials;

  register() {
    console.log('Registering user with credentials:', this.creds);
    this.accountService.register(this.creds).subscribe({
      next: response =>{
        console.log('Response:', response);
        this.cancel();
      },
      error: error => {
        console.error('Registration failed:', error);
      }
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
