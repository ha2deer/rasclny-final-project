import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class InputComponent implements OnInit {
  @Input() name: string;
  @Input() default: string;
  @Input() type: string;

  formGroup: FormGroup;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    // This accesses the parent form group
    this.formGroup = this.controlContainer.control as FormGroup;
  }

  showPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
