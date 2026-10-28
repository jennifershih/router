import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { CrisisService } from '../crisis.service';
import { Crisis } from '../crisis';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./crisis-list.component.css'],
  imports: [RouterLink, RouterOutlet, AsyncPipe],
})
export class CrisisListComponent implements OnInit {
  private service = inject(CrisisService);
  private route = inject(ActivatedRoute);

  crises$!: Observable<Crisis[]>;
  selectedId = 0;

  ngOnInit() {
    this.crises$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getCrises();
      }),
    );
  }
}
