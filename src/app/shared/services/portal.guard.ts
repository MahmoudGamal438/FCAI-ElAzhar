import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PortalService, Role } from './portal.service';

export const portalGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const portal = inject(PortalService);
  const router = inject(Router);

  if (!portal.isAuthenticated()) {
    return router.createUrlTree(['/portal']);
  }

  const requiredRole = route.data?.['role'] as Role | undefined;
  if (requiredRole && portal.role() !== requiredRole) {
    return router.createUrlTree(['/portal']);
  }

  return true;
};
