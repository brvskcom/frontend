import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ShopFormService} from "../../services/shop-form.service";

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

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  europeanCountries: string[] = [
    'Albania',
    'Andorra',
    'Austria',
    'Belgium',
    'Belarus',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Montenegro',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Greece',
    'Spain',
    'Netherlands',
    'Ireland',
    'Iceland',
    'Kazakhstan',
    'Kosovo',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Latvia',
    'North Macedonia',
    'Malta',
    'Moldova',
    'Monaco',
    'Germany',
    'Norway',
    'Poland',
    'Portugal',
    'Russia',
    'Romania',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Switzerland',
    'Sweden',
    'Turkey',
    'Ukraine',
    'Hungary',
    'United Kingdom',
    'Italy'
  ];

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService) { }

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

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );


    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );


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

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    // @ts-ignore
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }
}
