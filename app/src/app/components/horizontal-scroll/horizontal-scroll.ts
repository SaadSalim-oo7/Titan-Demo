import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-horizontal-scroll',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-scroll.html',
  styleUrl: './horizontal-scroll.css',
})
export class HorizontalScroll implements AfterViewInit, OnDestroy {

  @ViewChild('hscrollWrapper') wrapper!: ElementRef<HTMLElement>;
  @ViewChild('hscrollTrack') track!: ElementRef<HTMLElement>;

  private isBrowser: boolean;
  private scrollTriggerInstance: any;
  private ScrollTriggerRef: any;
  private onOrientationChange = () => {
    if (this.ScrollTriggerRef) this.ScrollTriggerRef.refresh();
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit() {
    if (!this.isBrowser) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    this.ScrollTriggerRef = ScrollTrigger;

    // Stops the pinned section from jumping when the mobile address bar
    // shows/hides mid-scroll (that also fires a resize event otherwise).
    ScrollTrigger.config({ ignoreMobileResize: true });

    const wrapperEl = this.wrapper.nativeElement;
    const trackEl = this.track.nativeElement;

    const getScrollDistance = () => trackEl.scrollWidth - wrapperEl.clientWidth;

    const tween = gsap.to(trackEl, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperEl,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + getScrollDistance(),
        invalidateOnRefresh: true,
      }
    });

    this.scrollTriggerInstance = tween.scrollTrigger;

    // Real orientation changes (rotating the phone) still get a clean refresh.
    window.addEventListener('orientationchange', this.onOrientationChange);
  }

  ngOnDestroy() {
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    if (this.isBrowser) {
      window.removeEventListener('orientationchange', this.onOrientationChange);
    }
  }
}