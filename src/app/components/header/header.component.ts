import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { BasketState } from '../../store/basket.state';
import { BasketStateModel } from '../../models/basket-state.model';
import { FormatCurrency } from '../../util/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(BasketState.getBasket) basketList$?: Observable<BasketStateModel>;

  formatCurrency = FormatCurrency;

}
