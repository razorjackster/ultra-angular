import { ProductModel } from './product.model';

export interface BasketStateModel {
    list: ProductModel[];
    total: number;
    startingFunds: number;
    funds: number;
    bought: ProductModel[];
}