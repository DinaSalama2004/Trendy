import { Component, computed, signal } from '@angular/core';
import { Iproduct } from '../../../shared/interfaces/iproduct';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CardComponent } from "../../card/card/card.component";

@Component({
  selector: 'app-favorite-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.scss']
})
export class FavoriteProductsComponent {

  wishlistSignal = signal<Iproduct[]>([]);
  favoriteProducts = computed(() => this.wishlistSignal());

  constructor(private wishlistService: WishlistService) {
    // Fetch initial wishlist
    this.wishlistService.getLoggenUserWhishList().subscribe();
    // Assign the signal after the service is available
    this.wishlistSignal = this.wishlistService.wishlistSignal;
    this.favoriteProducts = computed(() => this.wishlistSignal());
  }
}
