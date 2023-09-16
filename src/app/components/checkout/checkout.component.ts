import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // @ts-ignore
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
  }

  // @ts-ignore
  copyShippingAddressToBillingAddress(event) {
    if (this.checkoutFormGroup) {
      const shippingAddressControl = this.checkoutFormGroup.get('shippingAddress');
      const billingAddressControl = this.checkoutFormGroup.get('billingAddress');

      if (shippingAddressControl && billingAddressControl) {
        if (event.target.checked) {
          billingAddressControl.setValue(shippingAddressControl.value);
        } else {
          billingAddressControl.reset();
        }
      } else {
        console.error('shippingAddressControl or billingAddressControl is null or undefined');
      }
    } else {
      console.error('checkoutFormGroup is null or undefined');
    }
  }

  onSubmit() {
    console.log("Handling the submit button");
    const email = this.checkoutFormGroup?.get('customer')?.get('email')?.value;

    if (email !== undefined) {
      console.log("The email address is " + email);
    } else {
      console.error("Email is undefined");
    }
  }
}
