import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/actions/cart.actions';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from 'src/app/components/product-modal/product-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedProducts: any[] = [];

  searchText: string = '';
  selectedType: string = 'All';
  selectedPriceRanges: { [key: string]: boolean } = {};

  productTypes: string[] = [
    'All',
    'TVs',
    'Appliances',
    'Phones',
    'Video Games',
  ];
  priceRanges: string[] = [
    'Under $200',
    '$200 - $500',
    '$500 - $1000',
    'Above $1000',
  ];

  itemsPerPage = 10;

  constructor(
    private productService: ProductService,
    private store: Store,
    public dialog: MatDialog
  ) {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
      const matchesType =
        this.selectedType === 'All' || product.type === this.selectedType;
      const matchesPrice = this.filterByPrice(product.price);
      return matchesSearch && matchesType && matchesPrice;
    });

    this.displayedProducts = this.filteredProducts.slice(0, this.itemsPerPage);
  }

  filterByPrice(price: number): boolean {
    if (!Object.values(this.selectedPriceRanges).some((value) => value)) {
      return true;
    }
    if (this.selectedPriceRanges['Under $200'] && price < 200) return true;
    if (this.selectedPriceRanges['$200 - $500'] && price >= 200 && price <= 500)
      return true;
    if (
      this.selectedPriceRanges['$500 - $1000'] &&
      price > 500 &&
      price <= 1000
    )
      return true;
    if (this.selectedPriceRanges['Above $1000'] && price > 1000) return true;

    return false;
  }

  loadMore() {
    const currentLength = this.displayedProducts.length;
    const nextBatch = this.filteredProducts.slice(
      currentLength,
      currentLength + this.itemsPerPage
    );
    this.displayedProducts = [...this.displayedProducts, ...nextBatch];
  }

  openProductModal(product: any) {
    this.dialog.open(ProductModalComponent, {
      data: { product },
      width: '400px',
    });
  }

  addToCart(product: any) {
    this.store.dispatch(addToCart({ product }));
  }
}
