import { Component , Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/actions/cart.actions';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  addToCart() {
    this.store.dispatch(addToCart({ product: this.data.product }));
    // this.dialogRef.close();
  }

  
  close(): void {
    this.dialogRef.close();
  }
}
