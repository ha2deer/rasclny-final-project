import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {
  userPoints: number = 0; // Store user points

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.getUserPoints(); // Call method to get user points on component initialization
  }

  private getUserPoints(): void {
    this.authService.showProfile().subscribe({
      next: (response) => {
        if (response && response.points !== undefined) {
          this.userPoints = response.points; // Update user points
        }
      },
      error: (error) => {
        console.error('Error fetching user points:', error);
      }
    });
  }
}
