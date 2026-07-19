import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { RealEstate } from './pages/real-estate/real-estate';
import { CardspageComponent } from './pages/cardspage/cardspage';
import { ImportExport } from './pages/import-export/import-export';
import { AboutUs } from './pages/about-us/about-us';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'real-estate', component: RealEstate },
  { path: 'bank-cards', component: CardspageComponent },
  { path: 'import-export', component: ImportExport },
  { path: 'about-us', component: AboutUs },
];