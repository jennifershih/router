import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SelectivePreloadingStrategyService } from '../../selective-preloading-strategy.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [AsyncPipe],
})
export class AdminDashboardComponent implements OnInit {
  private route = inject(ActivatedRoute);

  sessionId!: Observable<string>;
  token!: Observable<string>;
  modules: string[] = [];

  constructor() {
    const preloadStrategy = inject(SelectivePreloadingStrategyService);

    this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {
    // Capture the session ID if available
    this.sessionId = this.route.queryParamMap.pipe(
      map((params) => params.get('session_id') || 'None'),
    );

    // Capture the fragment if available
    this.token = this.route.fragment.pipe(
      map((fragment) => fragment || 'None'),
    );
  }
}
