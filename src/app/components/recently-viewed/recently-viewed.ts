
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { scan } from 'rxjs';
import { ShopService, Product } from '../../services/shop';

@Component({
  selector: 'app-recently-viewed',
  imports: [],
  templateUrl: './recently-viewed.html',
  styleUrl: './recently-viewed.scss'
})
export class RecentlyViewed {
  private shop = inject(ShopService);

  items = toSignal(
    this.shop.viewed$.pipe(
      scan((all, p) => [...all, p].slice(-3), [] as Product[])
    ),
    { initialValue: [] as Product[] }
  );
}
