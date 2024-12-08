import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cat-button',
  templateUrl: './cat-button.component.html',
  styleUrls: ['./cat-button.component.css']
})
export class CatButtonComponent {
  @Input() text?: any;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color?: any;
  @Input() backGroundColor?: any;
  @Input() disabled?: boolean = false;
  @Input() categoryLink?:any;
}
