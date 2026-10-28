import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./admin.component.css'],
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
})
export class AdminComponent {}
