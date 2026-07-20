import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SplitLettersPipe } from '../../pipes/split-letters-pipe.spec';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SplitLettersPipe],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/import-export', label: 'IMPORT & EXPORT' },
    { path: '/real-estate', label: 'REAL ESTATE' },
    { path: '/investment-firm', label: 'INVESTMENT FIRM' },
    { path: '/bank-cards', label: 'BANK CARDS' },
    { path: '/calculator', label: 'CALCULATOR' },
    { path: '/about-us', label: 'ABOUT US' },
    { path: '/contact-us', label: 'CONTACT US' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}