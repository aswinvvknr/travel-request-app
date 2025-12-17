import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Travel } from '../../services/travel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-travel-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './travel-request.html',
  styleUrl: './travel-request.scss',
})
export class TravelRequest implements OnInit {
  travelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private travel: Travel,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.travelForm = this.fb.group({
      travelReqNo: [{ value: '1001', disabled: true }],
      travelDate: ['', Validators.required],
      pendingWith: [{ value: '', disabled: true }],
      employeeName: ['', Validators.required],
      numberField: [''],
      lineManager: ['', Validators.required],
      cluster: ['', Validators.required],
      company: ['', Validators.required],
      department: ['', Validators.required],
      location: ['', Validators.required],
      status: [{ value: 'Draft', disabled: true }],
      travelDescription: ['', Validators.required],
      travelDetails: this.fb.array([]),
    });
  }
  get f() {
    return this.travelForm.controls;
  }
  get travelDetails(): FormArray {
    return this.travelForm.get('travelDetails') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTravel(+id);
    } else {
      this.addTravelRow();
    }
  }
  createTravelRow(): FormGroup {
    return this.fb.group({
      confirm: [false],
      fromCity: ['', Validators.required],
      toCity: ['', Validators.required],
      departureDate: ['', Validators.required],
      remarks: [''],
    });
  }
  addTravelRow(): void {
    this.travelDetails.push(this.createTravelRow());
  }
  removeTravelRow(index: number): void {
    this.travelDetails.removeAt(index);
  }

  submitForm(): void {
    this.travelForm.markAllAsTouched();

    if (this.travelForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    const payload = this.travelForm.getRawValue();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.travel.updateTravel(+id, payload).subscribe(() => {
        alert('Updated successfully');
        this.router.navigate(['/']);
      });
    } else {
      console.log('Final Payloads:', payload);

      this.travel.saveTravel(payload).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Save Failed');
        },
      });
    }
  }

  loadTravel(id: number): void {
    this.travel.getTravelByid(id).subscribe((data) => {
      if (!data) {
        alert('No saved data found');
        return;
      }
      console.log(data);
      this.travelForm.reset();
      this.travelDetails.clear();

      this.travelForm.patchValue({
        employeeName: data.employeeName,
        numberField: data.numberField,
        lineManager: data.lineManager,
        travelDate: this.formatDate(data.travelDate),
        company: data.company,
        department: data.department,
        location: data.location,
        cluster: data.cluster,
        travelDescription: data.travelDescription,
      });
      this.travelForm.get('travelReqNo')?.setValue(data.travelReqNo);
      this.travelForm.get('status')?.setValue(data.status);
      this.travelForm.get('pendingWith')?.setValue(data.pendingWith);

      data.travelDetails.forEach((row: any) => {
        this.travelDetails.push(
          this.fb.group({
            confirm: [row.confirm],
            fromCity: [row.fromCity, Validators.required],
            toCity: [row.toCity, Validators.required],
            departureDate: [this.formatDate(row.departureDate), Validators.required],
            remarks: [row.remarks],
          })
        );
      });
    });
  }

  private formatDate(date: string): string {
    if (!date) return '';
    return date.split('T')[0]; // YYYY-MM-DD
  }
}
