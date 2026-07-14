import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar";
import { Hero } from "./components/hero/hero";
import { AboutComponent } from "./pages/about/about";
import { ServicesComponent } from "./pages/service/service";
import { HorizontalScroll } from "./components/horizontal-scroll/horizontal-scroll";
import { ContactSelect } from "./pages/contactus/contactus";
import { Testimonials } from "./pages/testimonials/testimonials";
import { CardspageComponent } from "./pages/cardspage/cardspage";
import { HeaderComponent } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, Hero, AboutComponent, ServicesComponent, HorizontalScroll, ContactSelect, Testimonials, CardspageComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app';
}
