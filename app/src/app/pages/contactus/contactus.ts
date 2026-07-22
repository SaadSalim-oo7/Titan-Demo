import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../services/popup';

interface LookingForOption {
  title: string;
  points: string[];
}

@Component({
  selector: 'app-contact-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactus.html',
  styleUrl: './contactus.css',
})
export class ContactSelect {
  options: LookingForOption[] = [
    {
      title: 'IMPORT & EXPORT TRADING',
      points: [
        'Global sourcing and verified supplier network',
        'Customs clearance and full trade documentation handled for you',
        'Freight, shipping and last-mile delivery across 40+ countries',
      ],
    },
    {
      title: 'REAL ESTATE INVESTMENT',
      points: [
        'Off-plan and ready properties across Dubai\u2019s top locations',
        'Guidance on high-yield areas and investment strategy',
        'End-to-end transaction support, from offer to title deed',
      ],
    },
    {
      title: 'BANK CARDS',
      points: [
        'Credit, debit, prepaid and commercial cards for every need',
        'Guidance on choosing the right card for your spending profile',
        'Fast application support and account setup assistance',
      ],
    },
  ];

  constructor(public popupService: PopupService) {}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}