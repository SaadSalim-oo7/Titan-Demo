import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.html',
  styleUrls: ['./service.css']
})
export class ServicesComponent implements AfterViewInit {

  isBrowser: boolean;

  @ViewChildren('serviceItem') serviceItems!: QueryList<ElementRef<HTMLElement>>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
  if (!this.isBrowser) return;

  const showItem = (row: HTMLElement) => {
    const imgBox = row.querySelector<HTMLElement>('[data-anim]');
    const textBox = row.querySelector<HTMLElement>('.service-content');

    if (imgBox) {
      imgBox.style.opacity = '1';
      imgBox.style.transform = 'translateX(0)';
    }
    if (textBox) {
      textBox.style.opacity = '1';
      textBox.style.transform = 'translateY(0)';
    }
  };

  const hideItem = (row: HTMLElement) => {
    const imgBox = row.querySelector<HTMLElement>('[data-anim]');
    const textBox = row.querySelector<HTMLElement>('.service-content');

    if (imgBox) {
      const direction = imgBox.getAttribute('data-anim');
      const offset = direction === 'left' ? '-80px' : '80px';
      imgBox.style.opacity = '0';
      imgBox.style.transform = `translateX(${offset})`;
    }
    if (textBox) {
      textBox.style.opacity = '0';
      textBox.style.transform = 'translateY(30px)';
    }
  };

  // Set up transitions + initial hidden state
  this.serviceItems.forEach(ref => {
    const row = ref.nativeElement;
    const imgBox = row.querySelector<HTMLElement>('[data-anim]');
    const textBox = row.querySelector<HTMLElement>('.service-content');

    if (imgBox) {
      imgBox.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    if (textBox) {
      textBox.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s';
    }

    hideItem(row);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const row = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        showItem(row);
      } else {
        hideItem(row); // reset so it can replay next time it enters
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  });

  this.serviceItems.forEach(ref => observer.observe(ref.nativeElement));
}

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}