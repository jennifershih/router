// TODO: Feature Componetized like CrisisCenter
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./hero-list.component.css'],
  imports: [RouterLink, AsyncPipe],
})
export class HeroListComponent implements OnInit {
  private service = inject(HeroService);
  private route = inject(ActivatedRoute);

  heroes$!: Observable<Hero[]>;
  selectedId = 0;

  ngOnInit() {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.selectedId = parseInt(params.get('id')!, 10);
        return this.service.getHeroes();
      }),
    );
  }
}
