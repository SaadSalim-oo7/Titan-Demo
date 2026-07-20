import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-connect-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './connect-popup.html',
  styleUrl: './connect-popup.css',
})
export class ConnectPopup {
  @Input() isOpen = false;
  @Output() closePopup = new EventEmitter<void>();

  submitted = false;

  interestOptions = [
    'Import & Export',
    'Real Estate',
    'Investment Firm',
    'Bank Cards'
  ];

  connectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.connectForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
      interest: ['', Validators.required],
    });
  }

  get f() {
    return this.connectForm.controls;
  }

  onClose() {
    this.submitted = false;
    this.connectForm.reset();
    this.closePopup.emit();
  }

  onOverlayClick(event: MouseEvent) {
    // Close only if the backdrop itself (not the card) was clicked
    if ((event.target as HTMLElement).classList.contains('popup-overlay')) {
      this.onClose();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.connectForm.invalid) {
      this.connectForm.markAllAsTouched();
      return;
    }

    // TODO: replace with your actual API call
    console.log('Form submitted:', this.connectForm.value);

    // Simple success feedback then close
    setTimeout(() => {
      this.onClose();
    }, 1500);
  }
}