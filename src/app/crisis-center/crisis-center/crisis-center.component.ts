import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crisis-center',
  templateUrl: './crisis-center.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./crisis-center.component.css'],
  imports: [RouterOutlet],
})
export class CrisisCenterComponent {}
