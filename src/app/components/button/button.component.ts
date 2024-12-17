import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text?: any;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color?: any;
  @Input() backGroundColor?: any;
  @Input() disabled?: boolean = false;
}
