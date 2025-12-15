import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-travel-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './travel-request.html',
  styleUrl: './travel-request.scss',
})
export class TravelRequest {
  travelForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    this.addTravelRow();
  }
  get f() {
    return this.travelForm.controls;
  }
  get travelDetails(): FormArray {
    return this.travelForm.get('travelDetails') as FormArray;
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
    // Mark all controls (including table rows) as touched
    this.travelForm.markAllAsTouched();

    if (this.travelForm.invalid) {
      console.warn('Form is invalid');
      return;
    }

    // getRawValue() includes disabled fields like status & pendingWith
    const payload = this.travelForm.getRawValue();

    console.log('Final Payload:', payload);
  }
}
