import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

/** Redirect to /login (remembering where the user wanted to go) unless logged in. */
function checkLogin(url: string): true | UrlTree {
  const authService = inject(AuthService);
  if (authService.isLoggedIn) {
    return true;
  }
  authService.redirectUrl = url;
  return inject(Router).createUrlTree(['/login'], {
    queryParams: { session_id: 123456789 },
    fragment: 'anchor',
  });
}

export const authGuard: CanActivateFn = (_route, state) =>
  checkLogin(state.url);

/** Prevents even downloading a lazy feature until the user is logged in. */
export const authMatchGuard: CanMatchFn = (_route, segments) =>
  checkLogin('/' + segments.map((s) => s.path).join('/'));
