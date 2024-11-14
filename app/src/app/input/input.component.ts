import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  name: string = '';
  phone: string = '';
  submittedName: string = '';
  submittedPhone: string = '';

  age: number | null = null;
  imageUrl: string = '';

  submitForm() {
    this.submittedName = this.name;
    this.submittedPhone = this.phone;
  }

  receiveAdditionalInfo(data: { age: number, imageUrl: string }) {
    this.age = data.age;
    this.imageUrl = data.imageUrl;
  }
}
