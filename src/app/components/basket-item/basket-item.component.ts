import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { FormatCurrency } from '../../util/common';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent {

  @Input() data: ProductModel;
  @Output() deleteClicked = new EventEmitter<ProductModel>();

  formatCurrency = FormatCurrency;

  deleteItemClick(){
    this.deleteClicked.emit(this.data);
  }

}
