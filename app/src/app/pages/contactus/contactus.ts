import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LookingForOption {
  title: string;
  points: string[];
  selected: boolean;
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
      selected: true,
    },
    {
      title: 'REAL ESTATE INVESTMENT',
      points: [
        'Off-plan and ready properties across Dubai\u2019s top locations',
        'Guidance on high-yield areas and investment strategy',
        'End-to-end transaction support, from offer to title deed',
      ],
      selected: false,
    },
  ];

  selectOption(index: number) {
    this.options.forEach((opt, i) => (opt.selected = i === index));
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}