import { Component } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { FormatCurrency } from '../../util/common';
import { Select, Store } from '@ngxs/store';
import { BasketState } from '../../store/basket.state';
import { Observable } from 'rxjs';
import { BasketStateModel } from '../../models/basket-state.model';
import { RemoveFromBasket } from '../../store/basket.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  @Select(BasketState.getBasket) basketList$?: Observable<BasketStateModel>;

  formatCurrency = FormatCurrency;

  constructor( private readonly store: Store) {}
  
  deleteClicked(item: ProductModel): void {
    this.store.dispatch(new RemoveFromBasket(item));
  }
}
