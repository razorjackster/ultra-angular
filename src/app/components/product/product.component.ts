import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { FormatCurrency } from '../../util/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  
  @Input() data: ProductModel;
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<ProductModel>();

  formatCurrency = FormatCurrency;

  onClick(){
    if (!this.disabled) {
      this.clicked.emit(this.data);
    }
  }

}
