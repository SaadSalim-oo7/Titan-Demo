import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { AboutComponent } from '../about/about';
import { HorizontalScroll } from '../../components/horizontal-scroll/horizontal-scroll';
import { ContactSelect } from '../contactus/contactus';
import { Testimonials } from '../testimonials/testimonials';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, AboutComponent, HorizontalScroll, ContactSelect, Testimonials],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}