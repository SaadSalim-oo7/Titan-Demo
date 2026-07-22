import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface Country {
  name: string;
  dialCode: string;
  iso: string;
}

@Component({
  selector: 'app-connect-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './connect-popup.html',
  styleUrl: './connect-popup.css',
})
export class ConnectPopup {
  @Input() isOpen = false;
  @Output() closePopup = new EventEmitter<void>();

  submitted = false;
  isCountryDropdownOpen = false;
  countrySearch = '';

  interestOptions = [
    'Import & Export',
    'Real Estate',
    'Investment Firm',
    'Bank Cards'
  ];

  countries: Country[] = [
    { name: 'United Arab Emirates', dialCode: '+971', iso: 'AE' },
    { name: 'Afghanistan', dialCode: '+93', iso: 'AF' },
    { name: 'Albania', dialCode: '+355', iso: 'AL' },
    { name: 'Algeria', dialCode: '+213', iso: 'DZ' },
    { name: 'Argentina', dialCode: '+54', iso: 'AR' },
    { name: 'Australia', dialCode: '+61', iso: 'AU' },
    { name: 'Austria', dialCode: '+43', iso: 'AT' },
    { name: 'Bahrain', dialCode: '+973', iso: 'BH' },
    { name: 'Bangladesh', dialCode: '+880', iso: 'BD' },
    { name: 'Belgium', dialCode: '+32', iso: 'BE' },
    { name: 'Brazil', dialCode: '+55', iso: 'BR' },
    { name: 'Canada', dialCode: '+1', iso: 'CA' },
    { name: 'China', dialCode: '+86', iso: 'CN' },
    { name: 'Egypt', dialCode: '+20', iso: 'EG' },
    { name: 'France', dialCode: '+33', iso: 'FR' },
    { name: 'Germany', dialCode: '+49', iso: 'DE' },
    { name: 'India', dialCode: '+91', iso: 'IN' },
    { name: 'Indonesia', dialCode: '+62', iso: 'ID' },
    { name: 'Iran', dialCode: '+98', iso: 'IR' },
    { name: 'Iraq', dialCode: '+964', iso: 'IQ' },
    { name: 'Ireland', dialCode: '+353', iso: 'IE' },
    { name: 'Italy', dialCode: '+39', iso: 'IT' },
    { name: 'Japan', dialCode: '+81', iso: 'JP' },
    { name: 'Jordan', dialCode: '+962', iso: 'JO' },
    { name: 'Kuwait', dialCode: '+965', iso: 'KW' },
    { name: 'Lebanon', dialCode: '+961', iso: 'LB' },
    { name: 'Malaysia', dialCode: '+60', iso: 'MY' },
    { name: 'Mexico', dialCode: '+52', iso: 'MX' },
    { name: 'Morocco', dialCode: '+212', iso: 'MA' },
    { name: 'Nepal', dialCode: '+977', iso: 'NP' },
    { name: 'Netherlands', dialCode: '+31', iso: 'NL' },
    { name: 'New Zealand', dialCode: '+64', iso: 'NZ' },
    { name: 'Nigeria', dialCode: '+234', iso: 'NG' },
    { name: 'Norway', dialCode: '+47', iso: 'NO' },
    { name: 'Oman', dialCode: '+968', iso: 'OM' },
    { name: 'Pakistan', dialCode: '+92', iso: 'PK' },
    { name: 'Philippines', dialCode: '+63', iso: 'PH' },
    { name: 'Poland', dialCode: '+48', iso: 'PL' },
    { name: 'Portugal', dialCode: '+351', iso: 'PT' },
    { name: 'Qatar', dialCode: '+974', iso: 'QA' },
    { name: 'Russia', dialCode: '+7', iso: 'RU' },
    { name: 'Saudi Arabia', dialCode: '+966', iso: 'SA' },
    { name: 'Singapore', dialCode: '+65', iso: 'SG' },
    { name: 'South Africa', dialCode: '+27', iso: 'ZA' },
    { name: 'South Korea', dialCode: '+82', iso: 'KR' },
    { name: 'Spain', dialCode: '+34', iso: 'ES' },
    { name: 'Sri Lanka', dialCode: '+94', iso: 'LK' },
    { name: 'Sweden', dialCode: '+46', iso: 'SE' },
    { name: 'Switzerland', dialCode: '+41', iso: 'CH' },
    { name: 'Syria', dialCode: '+963', iso: 'SY' },
    { name: 'Thailand', dialCode: '+66', iso: 'TH' },
    { name: 'Tunisia', dialCode: '+216', iso: 'TN' },
    { name: 'Turkey', dialCode: '+90', iso: 'TR' },
    { name: 'Uganda', dialCode: '+256', iso: 'UG' },
    { name: 'Ukraine', dialCode: '+380', iso: 'UA' },
    { name: 'United Kingdom', dialCode: '+44', iso: 'GB' },
    { name: 'United States', dialCode: '+1', iso: 'US' },
    { name: 'Yemen', dialCode: '+967', iso: 'YE' },
  ];

  selectedCountry: Country = this.countries[0]; // UAE default

  connectForm: FormGroup;

  constructor(private fb: FormBuilder, private elementRef: ElementRef) {
    this.connectForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{6,12}$/)]],
      interest: ['', Validators.required],
    });
  }

  get f() {
    return this.connectForm.controls;
  }

  get filteredCountries(): Country[] {
    if (!this.countrySearch.trim()) {
      return this.countries;
    }
    const term = this.countrySearch.toLowerCase();
    return this.countries.filter(
      c => c.name.toLowerCase().includes(term) || c.dialCode.includes(term)
    );
  }

  toggleCountryDropdown() {
    this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
    if (this.isCountryDropdownOpen) {
      this.countrySearch = '';
    }
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    this.isCountryDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isCountryDropdownOpen = false;
    }
  }

  onClose() {
    this.submitted = false;
    this.isCountryDropdownOpen = false;
    this.connectForm.reset();
    this.selectedCountry = this.countries[0];
    this.closePopup.emit();
  }

  onOverlayClick(event: MouseEvent) {
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

    const fullPhoneNumber = `${this.selectedCountry.dialCode} ${this.f['phone'].value}`;

    // TODO: replace with your actual API call
    console.log('Form submitted:', {
      ...this.connectForm.value,
      phone: fullPhoneNumber,
    });

    setTimeout(() => {
      this.onClose();
    }, 1500);
  }
}