import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    address: [''],
    phone: [''],
    class: [''],
    description: ['']
  });

  isASelected = false;
  isBSelected = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.isASelected) {
        formData.class = 'VIP';
      } else if (this.isBSelected) {
        formData.class = 'Standard';
      } else {
        formData.class = '';
      }
      console.log(formData);
      this.apiService.post('users', this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      alert('Harap tuliskan nama anda!');
    }
  }
  

  isFieldInvalid(field: string): boolean {
    const formField = this.form.get(field);
    return (formField!.touched || formField!.dirty) && formField!.invalid;
  }
  
  

  // onSubmit() {
  //   const formValue = this.form.value;
  //   formValue.deadline = JSON.stringify(formValue.deadline);
    
  //   this.apiService.post('users', this.form.value).subscribe(() => {
  //     this.router.navigate(['/']);
  //   });
  // }

}
