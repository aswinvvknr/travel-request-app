import { Component, OnInit, signal } from '@angular/core';
import { Travel } from '../../services/travel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-travel-list',
  imports: [RouterModule],
  templateUrl: './travel-list.html',
  styleUrl: './travel-list.scss',
})
export class TravelList implements OnInit {
  travels = signal<any[]>([]);

  constructor(private travelService: Travel) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.travelService.getAllTravels().subscribe((data) => {
      console.log('iam inside travellist');
      this.travels.set(data);
      console.log(this.travels);
    });
  }

  delete(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this travel request?');

    if (!confirmDelete) {
      return;
    }

    this.travelService.deleteTravel(id).subscribe(() => {
      this.loadData();
    });
  }
}
