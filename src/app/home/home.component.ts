import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.get('users').subscribe((response: any[]) => {
      this.data = response;
    });
  }

  delete(id: number) {
    this.apiService.delete(`users/${id}`).subscribe(() => {
      this.loadData();
    });
  }
  
  editData(id: number) {
    this.router.navigate(['/edit-data', id]);
  }

}
