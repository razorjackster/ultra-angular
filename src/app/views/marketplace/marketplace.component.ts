import { Component, OnDestroy } from '@angular/core';
import { combineLatestWith } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { DataService } from '../../services/data.service';
import { Select, Store } from '@ngxs/store';
import { BasketState } from '../../store/basket.state';
import { Observable, Subscription } from 'rxjs';
import { AddToBasket } from '../../store/basket.actions';
import { BasketStateModel } from '../../models/basket-state.model';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnDestroy {

  @Select(BasketState.getBasket) basketList$?: Observable<BasketStateModel>;

  public visibleProducts: ProductModel[] = [];
  public storeData: BasketStateModel;
  private storeSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService, 
    private readonly store: Store
  ) {
    this.storeSubscription = this.basketList$?.pipe(combineLatestWith(dataService.getProducts()))
    .subscribe(([data, items]) => {
      this.storeData = data;
      const boughtIds = data.bought.map(o => o.id);
      this.visibleProducts = items.filter(o => !boughtIds.includes(o.id));
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  isItemDisabled(item: ProductModel, basket: ProductModel[]): boolean {
    return basket.filter(obj => obj.id === item.id).length > 0;
  }

  itemClicked(item: ProductModel): void {
    this.store.dispatch(new AddToBasket(item));
  }

}
