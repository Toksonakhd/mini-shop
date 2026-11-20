
import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShopService, Product } from '../../services/shop';
import { RecentlyViewed } from '../recently-viewed/recently-viewed';

@Component({
  selector: 'app-shop',
  imports: [RecentlyViewed],
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop {
  private shop = inject(ShopService);

  products: Product[] = [
    { id: 1, name: 'Laptop', price: 2500 },
    { id: 2, name: 'Phone', price: 1200 },
    { id: 3, name: 'Headphones', price: 150 },
    { id: 4, name: 'Keyboard', price: 100 }
  ];

  cart = toSignal(this.shop.cart$, { requireSync: true });

  count = computed(() => this.cart().length);

  total = computed(() =>
    this.cart().reduce((sum, p) => sum + p.price, 0)
  );

  cartOpen = signal(false);
  recentlyViewedOpen = signal(false);
  paying = signal(false);
  toast = signal('');

  constructor() {
    this.shop.notify$.subscribe(message => {
      this.showToast(message);
    });
  }

  showToast(message: string) {
    this.toast.set(message);

    setTimeout(() => {
      if (this.toast() === message) {
        this.toast.set('');
      }
    }, 2000);
  }

  add(p: Product) {
    this.shop.add(p);
  }

  remove(index: number) {
    this.shop.remove(index);
  }

  view(p: Product) {
    this.shop.view(p);
    this.showToast(`Viewing ${p.name}`);
  }

  checkout() {
    if (this.count() === 0 || this.paying()) return;

    this.paying.set(true);

    this.shop.checkout().subscribe(order => {
      this.paying.set(false);
      this.cartOpen.set(false);
      this.showToast(`Order received: ${order}`);
    });
  }
}
