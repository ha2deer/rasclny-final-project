import { Component } from '@angular/core';
@Component({
  selector: 'app-chatboot',
  templateUrl: './chatboot.component.html',
  styleUrls: ['./chatboot.component.css']
})
export class ChatbootComponent {
  isDropdownVisible = false;
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    console.log("work");
    
  }
}

