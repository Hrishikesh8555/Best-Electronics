import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartProducts } from '../../store/selectors/cart.selectors';
import { removeFromCart } from '../../store/actions/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartProducts$ = this.store.select(selectCartProducts);

  constructor(private store: Store) {}

  removeProduct(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }
}
