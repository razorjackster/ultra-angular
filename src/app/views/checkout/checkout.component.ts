import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Select, Store } from '@ngxs/store';
import { BasketState } from '../../store/basket.state';
import { Observable } from 'rxjs';
import { BasketStateModel } from '../../models/basket-state.model';
import { FormatCurrency } from '../../util/common';
import { DataService } from '../../services/data.service';
import { first } from 'rxjs/operators';
import { PurchaseBasket } from '../../store/basket.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @Select(BasketState.getBasket) basketList$?: Observable<BasketStateModel>;

  formatCurrency = FormatCurrency;
  submitted = false;
  submitting = false;
  success = false;

  contactForm = new FormGroup({
    firstname: new FormControl('',  [Validators.required]),
    lastname: new FormControl('',  [Validators.required]),
    email: new FormControl('',  [Validators.required, Validators.email]),
    street: new FormControl('',  [Validators.required]),
    city: new FormControl('',  [Validators.required]),
    state: new FormControl('',  [Validators.required])
  });

  constructor(
    private dataService: DataService, 
    private readonly store: Store
  ) {}

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.submitting = true;
      this.dataService.submit().pipe(first()).subscribe(value => {
        this.submitting = false;
        this.success = true;
        this.store.dispatch(new PurchaseBasket());
      });
    }
  }

}
