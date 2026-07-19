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
  hoveredIndex: number | null = null;

  navLinks = [
    { path: '/', label: 'HOME', labelAr: 'الرئيسية' },
    { path: '/import-export', label: 'IMPORT & EXPORT', labelAr: 'الاستيراد والتصدير' },
    { path: '/real-estate', label: 'REAL ESTATE', labelAr: 'العقارات' },
    { path: '/investment-firm', label: 'INVESTMENT FIRM', labelAr: 'شركة الاستثمار' },
    { path: '/bank-cards', label: 'BANK CARDS', labelAr: 'البطاقات المصرفية' },
    { path: '/calculator', label: 'CALCULATOR', labelAr: 'الحاسبة' },
    { path: '/about-us', label: 'ABOUT US', labelAr: 'من نحن' },
    { path: '/contact-us', label: 'CONTACT US', labelAr: 'اتصل بنا' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onLinkHover(index: number) {
    this.hoveredIndex = index;
  }

  onLinkLeave() {
    this.hoveredIndex = null;
  }
}