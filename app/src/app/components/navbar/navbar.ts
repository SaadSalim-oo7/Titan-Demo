import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,     // Change to false if you're using modules
  imports: [],          // Add CommonModule if needed
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}