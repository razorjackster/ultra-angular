import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MarketplaceComponent } from './views/marketplace/marketplace.component';
import { BasketComponent } from './views/basket/basket.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { BasketState } from './store/basket.state';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MarketplaceComponent,
    BasketComponent,
    CheckoutComponent,
    NotFoundComponent,
    ProductComponent,
    BasketItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([BasketState], {
      developmentMode: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
