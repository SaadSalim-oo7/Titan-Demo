import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface BankCard {
  name: string;
  description: string;
  gradient: string;
  icon: string;
}

@Component({
  selector: 'app-cardspage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardspage.html',
  styleUrls: ['./cardspage.css']
})
export class CardspageComponent {
  cards: (BankCard & { safeIcon: SafeHtml })[] = [];
  private rawCards: BankCard[] = [
    {
      name: 'Credit Cards',
      description: 'Avail amazing discounts and cashback schemes with Axis Bank Credit Cards.',
      gradient: 'linear-gradient(135deg,#6E0F30,#B8203F 60%,#8E1230)',
      icon: `<svg viewBox="0 0 24 24" stroke-width="1.7"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></svg>`
    },
    {
      name: 'Debit Cards',
      description: 'Shop, withdraw and pay instantly with a card linked straight to your account.',
      gradient: 'linear-gradient(135deg,#0E3B4D,#1C7293 65%,#12546C)',
      icon: `<svg viewBox="0 0 24 24" stroke-width="1.7"><rect x="4" y="2" width="16" height="20" rx="2.5"/><path d="M9 18h6"/></svg>`
    },
    {
      name: 'Prepaid Cards',
      description: 'Load, control and spend with a card built for budgeting and gifting.',
      gradient: 'linear-gradient(135deg,#3B1550,#7A2C8E 65%,#59208C)',
      icon: `<svg viewBox="0 0 24 24" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg>`
    },
    {
      name: 'Commercial Debit Cards',
      description: 'Give your business direct, real-time access to company funds and expenses.',
      gradient: 'linear-gradient(135deg,#16202E,#2F4156 65%,#22314A)',
      icon: `<svg viewBox="0 0 24 24" stroke-width="1.7"><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/></svg>`
    },
    {
      name: 'Commercial Credit Cards',
      description: 'Manage business spends with higher limits and detailed expense tracking.',
      gradient: 'linear-gradient(135deg,#4A2410,#8C4A1F 65%,#6B361A)',
      icon: `<svg viewBox="0 0 24 24" stroke-width="1.7"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/></svg>`
    },
    {
      name: 'Transit Cards',
      description: 'Tap to travel across metro, bus and toll networks with a single card.',
      gradient: 'linear-gradient(135deg,#0B3D2E,#147A56 65%,#0F5C41)',
      icon: `<svg viewBox="0 0 24 24" stroke-width="1.7"><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M7 9V6a2 2 0 012-2h6a2 2 0 012 2v3"/></svg>`
    }
  ];
  constructor(private sanitizer: DomSanitizer) {
    this.cards = this.rawCards.map(card => ({
      ...card,
      safeIcon: this.sanitizer.bypassSecurityTrustHtml(card.icon)
    }));
  }
}