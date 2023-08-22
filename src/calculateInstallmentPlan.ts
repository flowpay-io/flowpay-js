import * as moment from 'moment';

import {ProductType, PartnerOffer, PartnerOfferOfferProduct} from './types/api';

import {InstallmentPlan} from './types/index';
import {isDefined, round2} from './util';

export const calculateInstallmentPlan = (
  offer: PartnerOffer,
  product: ProductType,
  principal: number,
  startDate: Date,
  postponeLength = 0,
  prolongation = false
): InstallmentPlan => {
  if (!offer.products) throw new Error('Offer without product');

  const offeredProduct = offer.products.find(
    (it: PartnerOfferOfferProduct) => it.product === product
  );

  if (
    !offeredProduct ||
    !isDefined(offeredProduct.ratePerc) ||
    !isDefined(offeredProduct.interestRateMultiplier) ||
    !isDefined(offeredProduct.postponeFeeMultiplier) ||
    !isDefined(offeredProduct.prolongationFeeMultiplier) ||
    !isDefined(offeredProduct.installmentCount) ||
    !isDefined(offeredProduct.installmentCount) ||
    !isDefined(offeredProduct.product) ||
    typeof offeredProduct.balloon !== 'boolean'
  )
    throw new Error('Product not offered');

  let sumInstallmentPrincipal = 0;
  let amountComplete = 0;

  const firstDate = moment.utc(startDate);
  firstDate.add(3, 'days');

  if (!offeredProduct.postponeEnabled) {
    postponeLength = 0;
  }

  const prolongationLength =
    offeredProduct.prolongationEnabled && prolongation ? 1 : 0;

  const installmentCount = offeredProduct.installmentCount + prolongationLength;
  const installmentAmount = Math.ceil(
    principal / (offeredProduct.installmentCount - postponeLength)
  );

  const feeMonthly = Math.ceil(
    round2(
      round2((offeredProduct.ratePerc / 100) * principal) *
        offeredProduct.interestRateMultiplier
    )
  );

  const postponeFeeMultiplier =
    postponeLength > 0 ? offeredProduct.postponeFeeMultiplier : 1;
  const postponeFee =
    postponeLength > 0 ? postponeFeeMultiplier * feeMonthly : 0;

  const prolongationFeeMultiplier =
    prolongationLength > 0 ? offeredProduct.prolongationFeeMultiplier : 1;
  const prolongationFee =
    prolongationLength > 0 ? prolongationFeeMultiplier * feeMonthly : 0;

  let nextDate;
  const installments = [];

  for (let i = 0; i < installmentCount; i++) {
    nextDate = moment.utc(firstDate);
    nextDate.add(i + 1, 'month');

    const isLast = i + 1 === installmentCount;
    const isPostponed = postponeLength > 0 && i < postponeLength;
    const isProlonged = prolongationLength > 0 && i < prolongationLength;
    const amount =
      isPostponed || isProlonged || (offeredProduct.balloon && !isLast)
        ? 0
        : isLast
        ? principal - sumInstallmentPrincipal
        : installmentAmount;
    const fee =
      feeMonthly +
      (isPostponed ? postponeFee : 0) +
      (isProlonged ? prolongationFee : 0);

    sumInstallmentPrincipal = sumInstallmentPrincipal + amount;
    amountComplete = amountComplete + amount + fee;

    installments.push({
      index: i + 1,
      principal: amount,
      fee: fee,
      dueDate: nextDate.toDate(),
    });
  }

  const postponeFeeDef =
    offeredProduct.postponeEnabled && postponeLength > 0
      ? offeredProduct.postponeFeeMultiplier * feeMonthly * postponeLength
      : 0;
  const prolongationFeeDef = offeredProduct.prolongationEnabled
    ? offeredProduct.prolongationFeeMultiplier * feeMonthly
    : 0;

  return {
    product: offeredProduct.product,
    balloon: offeredProduct.balloon,

    principal: principal,
    feeMonthly: feeMonthly,
    amountTotal: amountComplete,
    amountTotalBrutto: amountComplete,

    postponeLength: postponeLength,
    feePostponeMonth:
      offeredProduct.postponeEnabled && postponeLength > 0
        ? postponeFeeMultiplier * feeMonthly
        : 0,
    feePostponeTotal:
      offeredProduct.postponeEnabled && postponeLength > 0
        ? postponeFeeMultiplier * feeMonthly * postponeLength
        : 0,
    feePostpone: postponeFeeDef,

    prolongationLength: prolongationLength,
    feeProlongation: prolongationFeeDef,
    feeProlongationTotal: prolongationFee,

    installments: installments,
  };
};

// module.exports = {calculateInstallmentPlan};
