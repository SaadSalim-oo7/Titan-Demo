import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  activeIndex = 0;

  // Fixed decorative images — same every time, just to fill empty space
  decorativeImages = [
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500',
  ];

  testimonials: Testimonial[] = [
    {
      quote:
        "Our experience with Titan Financial Broker was very good. Specially Mr. Vedang was very supportive and provided proper guidance during processing my loan. Thank you Mr. Vedang for providing such wonderful service.",
      name: 'PUNIT SHUKLA',
    },
    {
      quote:
        "The team walked us through every step of our business banking setup. Clear communication, fast turnaround, and they genuinely made the process feel effortless.",
      name: 'AISHA RAHMAN',
    },
    {
      quote:
        "Professional, transparent, and always available when we had questions. Highly recommend Titan for anyone navigating mortgage options in the UAE.",
      name: 'DAVID CHEN',
    },
  ];

  get current(): Testimonial {
    return this.testimonials[this.activeIndex];
  }

  prevTestimonial() {
    this.activeIndex =
      (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextTestimonial() {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }
}