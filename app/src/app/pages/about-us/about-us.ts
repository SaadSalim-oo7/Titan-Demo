import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about'; // adjust path to match your project

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, AboutComponent],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection!: ElementRef<HTMLElement>;

  private targetYears = 15;
  private targetCountries = 40;
  private targetShipments = 15;
  private targetClients = 20;

  statYears = 0;
  statCountries = 0;
  statShipments = 0;
  statClients = 0;

  private hasAnimated = false;
  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser || !this.statsSection) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateStats();
            this.observer?.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(this.statsSection.nativeElement);
  }

  private animateStats() {
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.statYears = Math.round(this.targetYears * eased);
      this.statCountries = Math.round(this.targetCountries * eased);
      this.statShipments = Math.round(this.targetShipments * eased);
      this.statClients = Math.round(this.targetClients * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  scrollToTop() {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}