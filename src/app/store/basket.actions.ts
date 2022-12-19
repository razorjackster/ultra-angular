import { ProductModel } from '../models/product.model';

export class AddToBasket {
    static readonly type = '[Basket] Add';
    constructor(public item: ProductModel) {}
}
  
export class RemoveFromBasket {
    static readonly type = '[Basket] Remove';
    constructor(public item: ProductModel) {}
}

export class PurchaseBasket {
    static readonly type = '[Basket] Purchase Simulate';
    constructor() {}
}