import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent {
  @Input() name: string = '';
  @Input() phone: string = '';

  @Output() additionalInfo = new EventEmitter<{ age: number, imageUrl: string }>();

  age: number | null = null;
  imageUrl: string = '';

  submitAdditionalInfo() {
    this.additionalInfo.emit({
      age: this.age!,
      imageUrl: this.imageUrl
    });
  }
}
