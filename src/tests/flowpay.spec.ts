import {randomUUID} from 'crypto';
import {InstallmentPlan} from '../types/flowpay-js';
import {calculateInstallmentPlan} from '../index';
import {
  PartnerOffer,
  PartnerOfferOfferProduct,
  ProductType,
} from '../types/api/api';

let offer: PartnerOffer;

const compareInstallmentPlans = (
  plan1: InstallmentPlan,
  plan2: InstallmentPlan
): boolean => {
  let result =
    true &&
    plan1.amountTotal === plan2.amountTotal &&
    plan1.amountTotalBrutto === plan2.amountTotalBrutto &&
    plan1.feeProlongation === plan2.feeProlongation &&
    plan1.feePostpone === plan2.feePostpone &&
    plan1.feePostponeMonth === plan2.feePostponeMonth &&
    plan1.feePostponeTotal === plan2.feePostponeTotal &&
    plan1.feeMonthly === plan2.feeMonthly;

  if (!result) return result;

  for (let i = 0; i < plan1.installments.length; i++) {
    result =
      result &&
      plan1.installments[i].index === plan2.installments[i].index &&
      plan1.installments[i].principal === plan2.installments[i].principal &&
      plan1.installments[i].fee === plan2.installments[i].fee &&
      plan1.installments[i].dueDate.getTime() ===
        plan2.installments[i].dueDate.getTime();
  }

  return result;
};

const createOffer = (
  id: string,
  products: PartnerOfferOfferProduct[]
): PartnerOffer => {
  return {id, products};
};

describe('Installment plan', () => {
  beforeAll(() => {
    offer = createOffer(randomUUID(), [
      {
        product: ProductType.M1,
        minAmount: 100000,
        maxAmount: 200000,
        currency: 'CZK',
        ratePerc: 1,
        balloon: true,
        installmentCount: 1,
        prolongationEnabled: true,
        postponeEnabled: false,
        maxPostponeLength: 0,
        maxProlongationLength: 2,
        interestRateMultiplier: 1,
        postponeFeeMultiplier: 1,
        prolongationFeeMultiplier: 1,
      },
      {
        product: ProductType.M3,
        minAmount: 300000,
        maxAmount: 400000,
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
      {
        product: ProductType.M6,
        minAmount: 500000,
        maxAmount: 600000,
        currency: 'CZK',
        ratePerc: 1,
        balloon: false,
        installmentCount: 6,
        prolongationEnabled: false,
        postponeEnabled: true,
        maxPostponeLength: 2,
        maxProlongationLength: 0,
        interestRateMultiplier: 1,
        postponeFeeMultiplier: 1,
        prolongationFeeMultiplier: 1,
      },
      {
        product: ProductType.M12,
        minAmount: 700000,
        maxAmount: 800000,
        currency: 'CZK',
        ratePerc: 1,
        balloon: false,
        installmentCount: 12,
        prolongationEnabled: false,
        postponeEnabled: true,
        maxPostponeLength: 2,
        maxProlongationLength: 0,
        interestRateMultiplier: 1,
        postponeFeeMultiplier: 1,
        prolongationFeeMultiplier: 1,
      },
    ]);
  });

  it('Product: M1 | Prolongation: False', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M1,
      balloon: true,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 101000,
      amountTotalBrutto: 101000,
      postponeLength: 0,
      feePostpone: 0,
      feePostponeMonth: 0,
      feePostponeTotal: 0,
      prolongationLength: 0,
      feeProlongation: 1000,
      feeProlongationTotal: 0,
      installments: [
        {
          index: 1,
          principal: 100000,
          fee: 1000,
          dueDate: new Date('2022-02-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M1,
      100000,
      new Date('2022-01-03'),
      0,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M1 | Prolongation: True', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M1,
      balloon: true,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 103000,
      amountTotalBrutto: 103000,
      postponeLength: 0,
      feePostpone: 0,
      feePostponeMonth: 0,
      feePostponeTotal: 0,
      prolongationLength: 1,
      feeProlongation: 1000,
      feeProlongationTotal: 1000,
      installments: [
        {index: 1, principal: 0, fee: 2000, dueDate: new Date('2022-02-06')},
        {
          index: 2,
          principal: 100000,
          fee: 1000,
          dueDate: new Date('2022-03-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M1,
      100000,
      new Date('2022-01-03'),
      0,
      true
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M3 | Prolongation: False', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M3,
      balloon: true,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 103000,
      amountTotalBrutto: 103000,
      postponeLength: 0,
      feePostpone: 0,
      feePostponeMonth: 0,
      feePostponeTotal: 0,
      prolongationLength: 0,
      feeProlongation: 1000,
      feeProlongationTotal: 0,
      installments: [
        {index: 1, principal: 0, fee: 1000, dueDate: new Date('2022-02-06')},
        {index: 2, principal: 0, fee: 1000, dueDate: new Date('2022-03-06')},
        {
          index: 3,
          principal: 100000,
          fee: 1000,
          dueDate: new Date('2022-04-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M3,
      100000,
      new Date('2022-01-03'),
      0,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M3 | Prolongation: True', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M3,
      balloon: true,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 105000,
      amountTotalBrutto: 105000,
      postponeLength: 0,
      feePostpone: 0,
      feePostponeMonth: 0,
      feePostponeTotal: 0,
      prolongationLength: 1,
      feeProlongation: 1000,
      feeProlongationTotal: 1000,
      installments: [
        {index: 1, principal: 0, fee: 2000, dueDate: new Date('2022-02-06')},
        {index: 2, principal: 0, fee: 1000, dueDate: new Date('2022-03-06')},
        {index: 3, principal: 0, fee: 1000, dueDate: new Date('2022-04-06')},
        {
          index: 4,
          principal: 100000,
          fee: 1000,
          dueDate: new Date('2022-05-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M3,
      100000,
      new Date('2022-01-03'),
      0,
      true
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M6 | Postpone: 0', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M6,
      balloon: false,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 106000,
      amountTotalBrutto: 106000,
      postponeLength: 0,
      feePostpone: 0,
      feePostponeMonth: 0,
      feePostponeTotal: 0,
      prolongationLength: 0,
      feeProlongation: 0,
      feeProlongationTotal: 0,
      installments: [
        {
          index: 1,
          principal: 16667,
          fee: 1000,
          dueDate: new Date('2022-02-06'),
        },
        {
          index: 2,
          principal: 16667,
          fee: 1000,
          dueDate: new Date('2022-03-06'),
        },
        {
          index: 3,
          principal: 16667,
          fee: 1000,
          dueDate: new Date('2022-04-06'),
        },
        {
          index: 4,
          principal: 16667,
          fee: 1000,
          dueDate: new Date('2022-05-06'),
        },
        {
          index: 5,
          principal: 16667,
          fee: 1000,
          dueDate: new Date('2022-06-06'),
        },
        {
          index: 6,
          principal: 16665,
          fee: 1000,
          dueDate: new Date('2022-07-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M6,
      100000,
      new Date('2022-01-03'),
      0,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M6 | Postpone: 1', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M6,
      balloon: false,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 107000,
      amountTotalBrutto: 107000,
      postponeLength: 1,
      feePostpone: 1000,
      feePostponeMonth: 1000,
      feePostponeTotal: 1000,
      prolongationLength: 0,
      feeProlongation: 0,
      feeProlongationTotal: 0,
      installments: [
        {index: 1, principal: 0, fee: 2000, dueDate: new Date('2022-02-06')},
        {
          index: 2,
          principal: 20000,
          fee: 1000,
          dueDate: new Date('2022-03-06'),
        },
        {
          index: 3,
          principal: 20000,
          fee: 1000,
          dueDate: new Date('2022-04-06'),
        },
        {
          index: 4,
          principal: 20000,
          fee: 1000,
          dueDate: new Date('2022-05-06'),
        },
        {
          index: 5,
          principal: 20000,
          fee: 1000,
          dueDate: new Date('2022-06-06'),
        },
        {
          index: 6,
          principal: 20000,
          fee: 1000,
          dueDate: new Date('2022-07-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M6,
      100000,
      new Date('2022-01-03'),
      1,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M6 | Postpone: 2', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M6,
      balloon: false,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 108000,
      amountTotalBrutto: 108000,
      postponeLength: 2,
      feePostpone: 2000,
      feePostponeMonth: 1000,
      feePostponeTotal: 2000,
      prolongationLength: 0,
      feeProlongation: 0,
      feeProlongationTotal: 0,
      installments: [
        {index: 1, principal: 0, fee: 2000, dueDate: new Date('2022-02-06')},
        {index: 2, principal: 0, fee: 2000, dueDate: new Date('2022-03-06')},
        {
          index: 3,
          principal: 25000,
          fee: 1000,
          dueDate: new Date('2022-04-06'),
        },
        {
          index: 4,
          principal: 25000,
          fee: 1000,
          dueDate: new Date('2022-05-06'),
        },
        {
          index: 5,
          principal: 25000,
          fee: 1000,
          dueDate: new Date('2022-06-06'),
        },
        {
          index: 6,
          principal: 25000,
          fee: 1000,
          dueDate: new Date('2022-07-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M6,
      100000,
      new Date('2022-01-03'),
      2,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M12 | Postpone: 0', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M12,
      balloon: false,
      principal: 100000,
      feeMonthly: 1000,
      amountTotal: 112000,
      amountTotalBrutto: 112000,
      postponeLength: 0,
      feePostpone: 0,
      feePostponeMonth: 0,
      feePostponeTotal: 0,
      prolongationLength: 0,
      feeProlongation: 0,
      feeProlongationTotal: 0,
      installments: [
        {index: 1, principal: 8334, fee: 1000, dueDate: new Date('2022-02-06')},
        {index: 2, principal: 8334, fee: 1000, dueDate: new Date('2022-03-06')},
        {index: 3, principal: 8334, fee: 1000, dueDate: new Date('2022-04-06')},
        {index: 4, principal: 8334, fee: 1000, dueDate: new Date('2022-05-06')},
        {index: 5, principal: 8334, fee: 1000, dueDate: new Date('2022-06-06')},
        {index: 6, principal: 8334, fee: 1000, dueDate: new Date('2022-07-06')},
        {index: 7, principal: 8334, fee: 1000, dueDate: new Date('2022-08-06')},
        {index: 8, principal: 8334, fee: 1000, dueDate: new Date('2022-09-06')},
        {index: 9, principal: 8334, fee: 1000, dueDate: new Date('2022-10-06')},
        {
          index: 10,
          principal: 8334,
          fee: 1000,
          dueDate: new Date('2022-11-06'),
        },
        {
          index: 11,
          principal: 8334,
          fee: 1000,
          dueDate: new Date('2022-12-06'),
        },
        {
          index: 12,
          principal: 8326,
          fee: 1000,
          dueDate: new Date('2023-01-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M12,
      100000,
      new Date('2022-01-03'),
      0,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });

  it('Product: M12 | Postpone: 2', async () => {
    const plan: InstallmentPlan = {
      product: ProductType.M12,
      balloon: false,
      principal: 100000,
      amountTotal: 114000,
      amountTotalBrutto: 114000,
      feeMonthly: 1000,
      postponeLength: 2,
      feePostpone: 2000,
      feePostponeMonth: 1000,
      feePostponeTotal: 2000,
      prolongationLength: 0,
      feeProlongation: 0,
      feeProlongationTotal: 0,
      installments: [
        {index: 1, principal: 0, fee: 2000, dueDate: new Date('2022-02-06')},
        {index: 2, principal: 0, fee: 2000, dueDate: new Date('2022-03-06')},
        {
          index: 3,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-04-06'),
        },
        {
          index: 4,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-05-06'),
        },
        {
          index: 5,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-06-06'),
        },
        {
          index: 6,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-07-06'),
        },
        {
          index: 7,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-08-06'),
        },
        {
          index: 8,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-09-06'),
        },
        {
          index: 9,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-10-06'),
        },
        {
          index: 10,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-11-06'),
        },
        {
          index: 11,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2022-12-06'),
        },
        {
          index: 12,
          principal: 10000,
          fee: 1000,
          dueDate: new Date('2023-01-06'),
        },
      ],
    };
    const calculatedPlan = calculateInstallmentPlan(
      offer,
      ProductType.M12,
      100000,
      new Date('2022-01-03'),
      2,
      false
    );
    expect(compareInstallmentPlans(calculatedPlan, plan)).toBeTruthy();
  });
});
