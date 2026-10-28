import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HeroesModule } from './heroes/heroes.module';
import { AuthService } from './auth/auth.service';

describe('routing', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZoneChangeDetection(),
        importProvidersFrom(
          NoopAnimationsModule,
          FormsModule,
          HeroesModule,
          AuthModule,
          AppRoutingModule,
        ),
      ],
    });
    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
  });

  it('redirects the root and old hero URLs to /superheroes', async () => {
    await harness.navigateByUrl('/');
    expect(router.url).toBe('/superheroes');
    await harness.navigateByUrl('/hero/12');
    expect(router.url).toBe('/superhero/12');
  });

  it('lists heroes', async () => {
    await harness.navigateByUrl('/superheroes');
    expect(harness.routeNativeElement?.textContent).toContain('Dr Nice');
  });

  it('opens the lazy crisis center and resolves a crisis', async () => {
    await harness.navigateByUrl('/crisis-center/1');
    expect(router.url).toBe('/crisis-center/1');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Dragon Burning Cities',
    );
  });

  it('sends unknown crisis ids back to the list', async () => {
    await harness.navigateByUrl('/crisis-center/999');
    expect(router.url).toBe('/crisis-center');
  });

  it('protects /admin until the user logs in', async () => {
    await harness.navigateByUrl('/admin');
    expect(router.url).toContain('/login');
    expect(TestBed.inject(AuthService).redirectUrl).toBe('/admin');

    TestBed.inject(AuthService).isLoggedIn = true;
    await harness.navigateByUrl('/admin');
    expect(router.url).toBe('/admin');
  });

  it('shows the not-found page for unknown URLs', async () => {
    await harness.navigateByUrl('/nope');
    expect(harness.routeNativeElement?.textContent).toMatch(/not found/i);
  });
});
