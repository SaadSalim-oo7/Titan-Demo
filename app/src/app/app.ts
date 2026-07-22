import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { ConnectPopup } from './components/connect-popup/connect-popup';
import { PopupService } from './services/popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ConnectPopup],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public popupService: PopupService) {}
}