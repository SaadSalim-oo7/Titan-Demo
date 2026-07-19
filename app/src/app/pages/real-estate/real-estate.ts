import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface InvestmentType {
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

interface WhyInvestReason {
  title: string;
  description: string;
  icon: string;
}

/**
 * Real Estate landing page.
 *
 * The hero image is pinned (`position: sticky`) inside a tall wrapper
 * (`heroWrapper`, ~2.4x viewport height). As the user scrolls through that
 * wrapper, the image itself never moves — only the content stacked on top
 * of it animates, driven purely by scroll progress (0 -> 1):
 *
 *   progress 0.00 - 0.15  -> plain hero, big centered headline + button
 *   progress 0.15 - 0.35  -> "Beach" watermark fades in, bottom-left
 *   progress 0.45 - 0.70  -> top nav bar slides down into view
 *   progress 0.20 - 0.85  -> headline shrinks + rises toward the nav
 *   progress 0.70 - 1.00  -> headline fades out, handing off to the
 *                            normal "Residential Communities" section
 *                            that follows underneath.
 *
 * Once the wrapper has fully scrolled past, the sticky image is pushed
 * off screen by normal document flow and the page continues as a
 * standard scrolling section.
 *
 * Further down the page, the "Ways to Invest" section is a numbered
 * accordion: clicking an item expands its description + benefits and
 * cross-fades the matching image in the sticky panel on the right
 * (large screens only — on mobile it's a plain stacked accordion).
 *
 * The "Why Invest in Dubai" section is a reveal-on-scroll grid of
 * reasons, using the same IntersectionObserver + rs-reveal pattern as
 * the communities section below it.
 *
 * NOTE: this component reads `window` for scroll math. Since the app is
 * server-rendered, all `window` access is guarded behind `isBrowser` so
 * nothing runs during SSR.
 */
@Component({
  selector: 'app-real-estate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './real-estate.html',
  styleUrls: ['./real-estate.css'],
})
export class RealEstate implements AfterViewInit, OnDestroy {
  @ViewChild('heroWrapper', { static: true })
  heroWrapper!: ElementRef<HTMLElement>;

  @ViewChild('communitiesSection')
  communitiesSection?: ElementRef<HTMLElement>;

  @ViewChild('whyInvestSection')
  whyInvestSection?: ElementRef<HTMLElement>;

  // How many viewport-heights tall the scroll-through wrapper is.
  // Bigger number = slower / longer animation as the user scrolls.
  private readonly wrapperHeightMultiplier = 2.4;

  private readonly isBrowser: boolean;

  wrapperHeightPx = 0;

  navTransform = 'translateY(-100%)';
  overlayOpacity = 0.15;
  watermarkOpacity = 0;
  heroOpacity = 1;
  heroTransform = 'translateY(0px) scale(1)';

  communitiesVisible = false;
  whyInvestVisible = false;

  private communitiesObserver?: IntersectionObserver;
  private whyInvestObserver?: IntersectionObserver;

  // ---------- Investment types section ----------
  activeIndex = 0;

  investments: InvestmentType[] = [
    {
      title: 'Residential Investment',
      description:
        'Invest in premium apartments, villas, and townhouses located in Dubai\u2019s fastest-growing communities.',
      benefits: [
        'High rental income',
        'Long-term capital appreciation',
        'Family-friendly communities',
        'Investor-friendly ownership',
      ],
      image:
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&auto=format&fit=crop&q=80',
    },
    {
      title: 'Commercial Investment',
      description:
        'Own offices, retail shops, and commercial spaces in prime business districts.',
      benefits: [
        'Stable rental returns 5\u20139%',
        'Long-term corporate leases',
        'Premium business locations',
        'Strong ROI',
      ],
      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80',
    },
    {
      title: 'Luxury Real Estate',
      description:
        'Exclusive waterfront villas, penthouses, and branded residences for high-net-worth investors.',
      benefits: [
        'Premium lifestyle',
        'High resale value',
        'Elite locations',
        'Global investment appeal',
      ],
      image:
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&auto=format&fit=crop&q=80',
    },
    {
      title: 'Land Investment',
      description:
        'Acquire strategically located plots for future residential or commercial development.',
      benefits: [
        'High appreciation potential',
        'Flexible development options',
        'Long-term wealth creation',
      ],
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
    },
    {
      title: 'Hotel & Hospitality Investment',
      description:
        'Invest in hotel rooms, serviced apartments, and hospitality assets that benefit from Dubai\u2019s tourism industry.',
      benefits: [
        'Tourism-driven income',
        'Professional management',
        'International visitor demand',
      ],
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80',
    },
  ];

  selectInvestment(index: number): void {
    this.activeIndex = index;
  }

  pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }
  // ------------------------------------------------

  // ---------- Why Invest in Dubai section ----------
  whyInvest: WhyInvestReason[] = [
    {
      title: 'Tax-Efficient Ownership',
      description:
        'No annual property tax and no personal tax on rental income. Investors model returns on net figures, not headline rates \u2014 a structural advantage most global markets can\u2019t match.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Strong Rental Yields',
      description:
        'Prime areas such as Downtown Dubai, Dubai Marina, and Business Bay consistently deliver rental yields in the 6\u20138% range, well above many mature global cities.',
      icon: 'M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2',
    },
    {
      title: 'Full Freehold Ownership',
      description:
        'Foreign nationals can hold 100% freehold ownership in designated zones \u2014 no local partner required, and a purchase process built around clear, defined steps.',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      title: 'Regulated & Transparent',
      description:
        'The Dubai Land Department and RERA oversee brokers, developers, and advertising standards. Off-plan payments sit in escrow, released only as construction milestones are met.',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    },
    {
      title: 'Global Connectivity',
      description:
        'Anchored by one of the world\u2019s busiest international airports, Dubai sits within a short flight of a huge share of the world\u2019s population \u2014 a major draw for tenants and buyers alike.',
      icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
    },
    {
      title: 'Diversified, Resilient Economy',
      description:
        'Finance, logistics, tourism, and trade all contribute to Dubai\u2019s economic base, with real estate itself accounting for roughly 7% of GDP \u2014 a market built on more than one industry.',
      icon: 'M3 3v18h18M9 17V9m4 8V5m4 12v-6',
    },
    {
      title: 'Sustained Population Growth',
      description:
        'Dubai\u2019s population continues to grow at a steady annual pace, directly driving demand for both residential and commercial space and supporting long-term valuations.',
      icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4',
    },
    {
      title: 'Residency Pathways',
      description:
        'Eligible investors can access long-term residency visa options tied to property investment \u2014 adding a lifestyle dimension most purely financial assets don\u2019t offer.',
      icon: 'M16 12a4 4 0 10-8 0 4 4 0 008 0zM12 14v7m-4-3h8',
    },
  ];
  // ------------------------------------------------

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.setWrapperHeight();
    this.updateScrollAnimation();

    if (this.communitiesSection) {
      this.communitiesObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.communitiesVisible = true;
            this.communitiesObserver?.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      this.communitiesObserver.observe(this.communitiesSection.nativeElement);
    }

    if (this.whyInvestSection) {
      this.whyInvestObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.whyInvestVisible = true;
            this.whyInvestObserver?.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      this.whyInvestObserver.observe(this.whyInvestSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.communitiesObserver?.disconnect();
    this.whyInvestObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) {
      return;
    }
    this.updateScrollAnimation();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) {
      return;
    }
    this.setWrapperHeight();
    this.updateScrollAnimation();
  }

  private setWrapperHeight(): void {
    this.wrapperHeightPx = window.innerHeight * this.wrapperHeightMultiplier;
  }

  private updateScrollAnimation(): void {
    if (!this.heroWrapper) {
      return;
    }

    const rect = this.heroWrapper.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = rect.height - viewportHeight;

    if (scrollableDistance <= 0) {
      return;
    }

    const progress = this.clamp(-rect.top / scrollableDistance, 0, 1);

    // Watermark fades in early.
    this.watermarkOpacity = this.smoothstep(0.15, 0.35, progress);

    // Nav bar slides down from off-screen into place.
    const navProgress = this.smoothstep(0.45, 0.7, progress);
    this.navTransform = `translateY(${(1 - navProgress) * -100}%)`;

    // Dark overlay deepens gradually so late-stage text/nav stay legible.
    this.overlayOpacity = 0.15 + this.smoothstep(0.1, 0.9, progress) * 0.25;

    // Headline shrinks and rises toward the nav, then fades out.
    const riseProgress = this.smoothstep(0.2, 0.85, progress);
    const translateY = -riseProgress * 160;
    const scale = 1 - riseProgress * 0.18;
    this.heroTransform = `translateY(${translateY}px) scale(${scale})`;
    this.heroOpacity = 1 - this.smoothstep(0.7, 1, progress);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  /** Standard smoothstep easing between edge0 and edge1. */
  private smoothstep(edge0: number, edge1: number, x: number): number {
    const t = this.clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }
}