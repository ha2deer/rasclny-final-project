import { Component } from '@angular/core';

@Component({
  selector: 'app-our',
  templateUrl: './our.component.html',
  styleUrls: ['./our.component.css']
})
export class OurComponent {
  teamMembers = [
    {
      name: 'Hadeer Mubarak',
      role: 'UI/UX / Front end',
      // image: '/assets/WhatsApp Image 2024-11-22 at 8.38.17 PM.jpeg',
      // image: '/assets/WhatsApp Image 2024-11-23 at 12.42.35 AM.jpeg',
      image: 'assets/hadeeer.jpeg',
    },
    {
      name: 'Nada Samy',
      role: 'Front end',
      image: 'assets/nadaa.jpeg'
    },
    {
      name: 'Rawan Gamal',
      role: 'AI',
      image: 'assets/rawan.jpeg'
    },
    {
      name: 'Hager Hany',
      role: 'Back end ',
      image: 'assets/hagerr.jpeg'
    },
    {
      name: 'Saad Tarek',
      role: 'Back end ',
      image: 'assets/saaad.jpeg'
    },
    {
      name: 'Yousef Atef',
      role: 'Back end ',
      image: 'assets/youseef.jpeg'
    }
  ];
}
