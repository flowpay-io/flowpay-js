# Flowpay.js

## Installation

Use `npm` to install the Flowpay.js module:

```sh
npm install @flowpay/flowpay-js
```

## Usage

```js
import '@flowpay/flowpay-js';
```

Calculate installment plan with specified product parameters given provided
financing offer

```js
const calculatedPlan = calculateInstallmentPlan(
  offer,
  ProductType.M6,
  100000,
  new Date('2022-01-03'),
  0,
  false
);
```
