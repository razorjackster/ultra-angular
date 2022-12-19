import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { AddToBasket, RemoveFromBasket, PurchaseBasket } from './basket.actions';
import { ProductModel } from '../models/product.model';
import { BasketStateModel } from '../models/basket-state.model';

@State<BasketStateModel>({
    name: 'basket',
    defaults: {
        list: [],
        total: 0,
        startingFunds: 100,
        funds: 100,
        bought: []
    }
})
@Injectable()
export class BasketState {

    @Selector()
    static getBasket(state: BasketStateModel): BasketStateModel {
        return state;
    }

    updateState(list: ProductModel[], state: BasketStateModel): BasketStateModel {
        const total = list.reduce((acc, a) => acc + a.price, 0);
        return {
            list,
            total,
            startingFunds: state.startingFunds,
            funds: state.startingFunds - total,
            bought: state.bought
        };
    }

    @Action(AddToBasket)
    AddToBasket({patchState, getState}: StateContext<BasketStateModel>, {item}: AddToBasket): void {
        patchState(this.updateState([...getState().list, item], getState()));
    }

    @Action(RemoveFromBasket)
    RemoveFromBasket({patchState, getState}: StateContext<BasketStateModel>, {item}: RemoveFromBasket): void {
        const list = getState().list;
        const index = list.findIndex(obj => obj.id === item.id); 
        patchState(this.updateState([...list.slice(0, index), ...list.slice(index+1)], getState()));
    }

    @Action(PurchaseBasket)
    PurchaseBasket({patchState, getState}: StateContext<BasketStateModel>, {}: PurchaseBasket): void {
        patchState({
            list: [],
            total: 0,
            startingFunds: getState().startingFunds - getState().total,
            funds: getState().startingFunds - getState().total,
            bought: getState().list
        });
    }

}