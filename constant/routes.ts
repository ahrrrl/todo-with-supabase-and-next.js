export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const AUTH_ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
};

export const DASHBOARD_ROUTE = '/dashboard';

export const DASHBOARD_ROUTES = {
  CREATE_TODO: '/dashboard/todolist/new',
  VIEW_TODO: '/dashboard/todolist/view',
  EDIT_TODO: '/dashboard/todolist/edit',
}

export const GUEST_ROUTES = [AUTH_ROUTES.SIGN_IN, AUTH_ROUTES.SIGN_UP];
