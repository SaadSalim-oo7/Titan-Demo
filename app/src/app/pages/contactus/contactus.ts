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
      title: 'HOME FINANCE & MORTGAGE SOLUTIONS',
      points: [
        'Access to the best products in the market',
        'An assigned consultant to handle the process end to end',
        "Covering all types of finance whether it's Islamic, conventional, a new purchase or a home loan buy out",
      ],
      selected: true,
    },
    {
      title: 'CREDIT CARD, LOANS & ACCOUNTS',
      points: [
        'Access to experienced consultants',
        'Comprehensive options for all client types available',
        'Recommendations tailored to your needs and requirements',
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