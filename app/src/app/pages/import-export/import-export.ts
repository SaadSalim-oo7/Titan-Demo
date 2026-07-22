import { Component } from '@angular/core';
import { PopupService } from '../../services/popup';

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [],
  templateUrl: './import-export.html',
  styleUrl: './import-export.css',
})
export class ImportExport {
  constructor(public popupService: PopupService) {}
}