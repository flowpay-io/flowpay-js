import {ProductType} from '../api';

export interface Installment {
  /** Sequence number of the installment, starting with 1 */
  index: number;
  /** The amount of principal being paid with the installment */
  principal: number;
  /** The fee being paid with the installment */
  fee: number;
  /** Due date of the installment */
  dueDate: Date;
}

export interface InstallmentPlan {
  /** Type of product */
  product: ProductType;
  /** Indicating whether the product is of a balloon financing type */
  balloon: boolean;
  /** Number of postponed installments */
  postponeLength: number;
  /** Number of prolongated installments */
  prolongationLength: number;
  /** Total installment amount of the financing */
  principal: number;
  /** Total amount to pe paid */
  amountTotal: number;
  /** Total amount to pe paid without benefits */
  amountTotalBrutto?: number;
  /** Monthly fee */
  feeMonthly: number;
  /** The monthly postpone fee if postponement is applied to the financing*/
  feePostponeMonth: number;
  /** The list price of postponement */
  feePostpone: number;
  /** Total amount of postpone fee if postponement is applied to the financing */
  feePostponeTotal: number;
  /** The list price of prolongation */
  feeProlongation: number;
  /** Total amount of prolongation fee if prolongation is applied to the financing */
  feeProlongationTotal: number;
  /** List of installments */
  installments: Array<Installment>;
}
