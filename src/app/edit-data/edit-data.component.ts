import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  id?: number;
  data: any = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.apiService.get(`users/${this.id}`).subscribe((data: any) => {
        this.data = data;
      });
    });
  }

  updateData() {
    const newData = {
      id: this.data.id,
      name: this.data.name,
      address: this.data.address,
      phone: this.data.phone,
      class: this.data.class,
      description: this.data.description
    };
  
    this.apiService.put(`users/${this.data.id}`, newData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
  

}
