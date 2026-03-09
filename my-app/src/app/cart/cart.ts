import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../myservices/cart-service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
cartItems: any[] = [];
  total: number = 0;
  itemCount: number = 0;
  selectedItems: {[key: string]: boolean} = {};
  errorMessage: string = '';
  isLoading: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.cartItems = response.cart;
          this.total = response.total;
          this.itemCount = response.itemCount;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading cart:', error);
        this.errorMessage = 'Failed to load cart';
        this.isLoading = false;
      }
    });
  }



  removeItem(productId: string): void {
    if (confirm('Are you sure you want to remove this item from cart?')) {
      this.cartService.removeFromCart(productId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadCart();
            delete this.selectedItems[productId];
          }
        },
        error: (error: any) => {
          console.error('Error removing item:', error);
          alert('Failed to remove item from cart');
        }
      });
    }
  }

  removeSelectedItems(): void {
    const selectedProductIds = Object.keys(this.selectedItems).filter(
      id => this.selectedItems[id]
    );

    if (selectedProductIds.length === 0) {
      alert('Please select items to remove');
      return;
    }

    if (confirm(`Remove ${selectedProductIds.length} selected item(s)?`)) {
      let removedCount = 0;
      
      selectedProductIds.forEach((productId, index) => {
        this.cartService.removeFromCart(productId).subscribe({
          next: (response: any) => {
            removedCount++;
            delete this.selectedItems[productId];
            
            // Reload cart after all removals
            if (removedCount === selectedProductIds.length) {
              this.loadCart();
            }
          },
          error: (error: any) => {
            console.error('Error removing item:', error);
          }
        });
      });
    }
  }

  async updateCart(): Promise<void> {
    this.isUpdating = true;
    
    try {
      const selectedProductIds = Object.keys(this.selectedItems).filter(
        id => this.selectedItems[id]
      );

      // Remove selected items
      for (const id of selectedProductIds) {
        await this.cartService.removeFromCart(id).toPromise();
        delete this.selectedItems[id];
      }

      // Update remaining items' quantities
      for (const item of this.cartItems) {
        if (!selectedProductIds.includes(item.productId)) {
           await this.cartService.updateCart(item.productId, item.quantity).toPromise();
        }
      }

      alert('Cart updated successfully!');
      this.loadCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart completely');
      this.isUpdating = false;
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      this.cartService.clearCart().subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadCart();
            this.selectedItems = {};
          }
        },
        error: (error: any) => {
          console.error('Error clearing cart:', error);
          alert('Failed to clear cart');
        }
      });
    }
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  getSubtotal(item: any): number {
    return item.price * item.quantity;
  }

  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.cartItems.forEach(item => {
      this.selectedItems[item.productId] = isChecked;
    });
  }

  isAllSelected(): boolean {
    return this.cartItems.length > 0 && 
           this.cartItems.every(item => this.selectedItems[item.productId]);
  }

  getTotalProductCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }  
}
