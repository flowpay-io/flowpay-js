# Flowpay.js

## Installation

Use `npm` to install the Flowpay.js module:

```sh
$ npm install --save @flowpay/flowpay-js
```

## Usage

```js
// JS:
const flowpay = require('@flowpay/flowpay-js');

// TS:
import { PartnerOffer, ProductType calculateInstallmentPlan } from '@flowpay/flowpay-js';
```

Calculate installment plan with specified product parameters given provided
financing offer

```js
// JS:
var offer = {
  id: '1',
  products: [
    {
      product: 'M3',
      minAmount: 100000,
      maxAmount: 200000,
      currency: 'CZK',
      ratePerc: 1,
      balloon: true,
      installmentCount: 3,
      prolongationEnabled: true,
      postponeEnabled: false,
      maxPostponeLength: 0,
      maxProlongationLength: 2,
      interestRateMultiplier: 1,
      postponeFeeMultiplier: 1,
      prolongationFeeMultiplier: 1,
    },
  ],
};

var plan = flowpay.calculateInstallmentPlan(
  offer,
  'M3',
  100000,
  new Date('2022-01-03'),
  0,
  false
);

console.log(plan);

// TS:
const offer: PartnerOffer = {
  id: '1',
  products: [
    {
      product: ProductType.M3,
      minAmount: 100000,
      maxAmount: 200000,
      currency: 'CZK',
      ratePerc: 1,
      balloon: true,
      installmentCount: 3,
      prolongationEnabled: true,
      postponeEnabled: false,
      maxPostponeLength: 0,
      maxProlongationLength: 2,
      interestRateMultiplier: 1,
      postponeFeeMultiplier: 1,
      prolongationFeeMultiplier: 1,
    },
  ],
};

const plan = calculateInstallmentPlan(
  offer,
  ProductType.M3,
  100000,
  new Date('2022-01-03'),
  0,
  false
);

console.log(plan);
```
