import { Component, HostListener, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  
  translateY: number = 0;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    // Run an initial check to set the image position on page load
    setTimeout(() => this.checkScroll(), 50);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkScroll();
  }

  private checkScroll() {
  if (!this.isBrowser) return;
  if (!this.aboutSection) return;
  
  // Defensive fallback: check both nativeElement and direct reference,
  // and verify getBoundingClientRect is available before invoking it.
  const element = this.aboutSection.nativeElement || this.aboutSection;
  if (!element || typeof element.getBoundingClientRect !== 'function') return;
  
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight;

  const totalDistance = viewHeight + rect.height;
  const scrollDistance = viewHeight - rect.top;

  let progress = scrollDistance / totalDistance;
  progress = Math.max(0, Math.min(1, progress));

  const maxTranslate = -25; // 25% movement range (since image height is 125%)
  this.translateY = progress * maxTranslate;
}

  scrollToTop() {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}