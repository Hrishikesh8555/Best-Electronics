import { createAction, props } from '@ngrx/store';

export const addToCart = createAction(
  '[Cart] Add Product',
  props<{ product: any }>()
);
export const removeFromCart = createAction(
  '[Cart] Remove Product',
  props<{ productId: number }>()
);
