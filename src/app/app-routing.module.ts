import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './views/marketplace/marketplace.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { BasketComponent } from './views/basket/basket.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'basket', component: BasketComponent },
  { path: '', component: MarketplaceComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
