import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

function isAuthenticated(): boolean {
  const token = localStorage.getItem('authToken');
  try {
    if (token) {
      jwtDecode(token);
      return true;
    }
  } catch (error) {
    console.error('Invalid token:', error);
  }
  return false;
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
