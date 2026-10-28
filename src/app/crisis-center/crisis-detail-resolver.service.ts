import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { CrisisService } from './crisis.service';
import { Crisis } from './crisis';

/** Loads the crisis before showing the detail page; unknown ids go back to the list. */
export const crisisDetailResolver: ResolveFn<Crisis> = (route) => {
  const router = inject(Router);
  return inject(CrisisService)
    .getCrisis(route.paramMap.get('id')!)
    .pipe(
      take(1),
      map(
        (crisis) =>
          crisis ?? new RedirectCommand(router.parseUrl('/crisis-center')),
      ),
    );
};
