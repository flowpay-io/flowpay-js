/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateFinancingRequest {
  /**
   * Identifier of the customer
   * @format uuid
   * @minLength 1
   */
  customerId: string;
  /** Identification of primary representative. The identity can be specified either by Flowpay's internal representative ID or by providing representative's personal data. */
  rep1: CreateFinancingRequestRepresentative;
  /** Identification of 2nd representative. The identity can be specified either by Flowpay's internal representative ID or by providing representative's personal data. */
  rep2?: CreateFinancingRequestRepresentative;
  /** Boolean flag indicating if any of customer's representatives are PEPs */
  pep: boolean;
  /**
   * Identifier of an offer
   * @format uuid
   */
  offerId: string;
  /** Requested product parameters */
  product: PartnerProductParams;
  /**
   * Bank account number
   * @maxLength 34
   * @example "CZ6508000000192000145399"
   */
  iban: string;
}

export interface CreateFinancingRequestRepresentative {
  /**
   * Identifier of the representative
   * @format uuid
   */
  id?: string;
  /**
   * Email address
   * @format email
   */
  email?: string;
  /**
   * Phone number in international format E.123
   * @maxLength 24
   */
  phone?: string;
}

export interface CustomerScoringCompleted {
  /**
   * Identifier of the customer
   * @format uuid
   */
  customerId?: string;
  result?: CustomerScoringCompletedResult;
}

export enum CustomerScoringCompletedResult {
  OFFER = 'OFFER',
  UNQUALIFIED = 'UNQUALIFIED',
}

export interface Financing {
  /**
   * Identifier of the financing
   * @format uuid
   * @minLength 1
   */
  id: string;
  /** Financing state */
  state: FinancingState;
  /**
   * Identifier of the customer
   * @format uuid
   * @minLength 1
   */
  customerId: string;
  /**
   * Identifier of 1st representative
   * @format uuid
   * @minLength 1
   */
  rep1Id: string;
  /**
   * Identifier of 2nd representative
   * @format uuid
   */
  rep2Id?: string;
  /** URL to navigate 1st representative to sign the contract. Only applicable for financing state CONTRACT_SENT. */
  rep1ContractSignUrl?: string;
  /** URL to navigate 2nd representative to sign the contract. Only applicable for financing state CONTRACT_SENT. */
  rep2ContractSignUrl?: string;
  /** Specification of financing product. Depending on the financing state it may contain requested, proposed or approved product parameters. */
  product: PartnerProductParams;
  /** Total repayment amount. Applicable once the financing is DISBURSED. */
  totalRepayment?: number;
  /** Total paid amount. Applicable once the financing is DISBURSED. */
  totalPaid?: number;
  /** Total outstanding amount. Applicable once the financing is DISBURSED. */
  outstandingAmount?: number;
  /** Installment plan. Applicable once the financing is DISBURSED. */
  installments?: FinancingInstallment[];
  /** Payment instruction. Applicable once the financing is DISBURSED. */
  paymentInstruction?: PaymentInstruction;
  prolongationEligible?: boolean;
  /** Prolongation fee if applicable. Applicable once the financing is DISBURSED. */
  prolongationFee?: number;
  /**
   * Created at
   * @format ISO 8601
   * @example "2020-12-21T20:20:20.20202Z"
   */
  createdAt?: string;
}

export interface FinancingInstallment {
  /**
   * Due date
   * @format date
   * @example "2020-12-21"
   */
  dueDate?: string;
  /**
   * Paid date
   * @format date
   * @example "2020-12-21"
   */
  paidDate?: string;
  /** Total installment amount */
  total?: number;
  /** Principal */
  principal?: number;
  /** Fee */
  fee?: number;
  /** Total paid amount */
  paidTotal?: number;
  /**
   * Currency as defined by ISO 4217
   * @example "CZK"
   */
  currency?: string;
  /** Installment state */
  state?: InstallmentInstallmentState;
}

export interface FinancingCreated {
  /**
   * Unique identifier of the financing
   * @format uuid
   * @minLength 1
   */
  id: string;
}

export interface FinancingOverview {
  /**
   * Identifier of the financing
   * @format uuid
   * @minLength 1
   */
  id: string;
  /** Financing state */
  state: FinancingState;
  /** Financing principal */
  principal?: number;
  /**
   * Currency as defined by ISO 4217
   * @example "CZK"
   */
  currency?: string;
  /**
   * Date from
   * @format date
   * @example "2020-12-21"
   */
  from?: string;
}

export enum FinancingState {
  NEW = 'NEW',
  SUBMITTED = 'SUBMITTED',
  CHECKING = 'CHECKING',
  WAIT_NEW_CONDITIONS = 'WAIT_NEW_CONDITIONS',
  APPROVED = 'APPROVED',
  CONTRACT_SENT = 'CONTRACT_SENT',
  SIGNED = 'SIGNED',
  PENDING_DISBURSEMENT = 'PENDING_DISBURSEMENT',
  DISBURSED = 'DISBURSED',
  PAID = 'PAID',
  CLIENT_REFUSED = 'CLIENT_REFUSED',
  NOT_APPROVED = 'NOT_APPROVED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  OVERDUE = 'OVERDUE',
  COLLECTION = 'COLLECTION',
}

export interface FinancingStateChanged {
  /**
   * Identifier of the financing
   * @format uuid
   * @minLength 1
   */
  id: string;
  /** Financing state */
  state?: FinancingState;
  /**
   * Effective at
   * @format ISO 8601
   * @example "2020-12-21T20:20:20.20202Z"
   */
  effectiveAt?: string;
}

export enum InstallmentInstallmentState {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PLANNED = 'PLANNED',
  OVERDUE = 'OVERDUE',
  CANCELED = 'CANCELED',
  RESCHEDULED = 'RESCHEDULED',
  PROLONGED = 'PROLONGED',
}

export interface KycStarted {
  token?: string;
}

export interface KycVerificationResponse {
  /**
   * Identifier of the customer
   * @format uuid
   */
  customerId?: string;
  /**
   * Identifier of the representative
   * @format uuid
   */
  repId?: string;
  state?: KycVerificationResponseState;
}

export enum KycVerificationResponseState {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface MerchantBankAccount {
  /**
   * BIC/SWIFT code as defined by ISO 9362
   * @maxLength 8
   */
  bic: string;
  /**
   * Bank account number
   * @maxLength 34
   * @example "CZ6508000000192000145399"
   */
  iban: string;
  /** Bank account name */
  name?: string;
  /** Bank account owner's name */
  ownerName?: string;
  /** Bank account balances (may contain multiple currencies in case of a multi-currency account). */
  balances?: MerchantBankAccountBalance[];
}

export interface MerchantBankAccountBalance {
  /**
   * Account balance currency as defined by ISO 4217
   * @example "CZK"
   */
  currency: string;
  /** Account balance amount */
  amount: number;
  /** Account balance type */
  type?: string;
  /**
   * Account balance reference date
   * @format date
   * @example "2020-12-21"
   */
  referenceDate: string;
}

export interface MerchantBankTransaction {
  /** Unique transaction identifier */
  id: string;
  /**
   * Bank account number
   * @maxLength 34
   * @example "CZ6508000000192000145399"
   */
  iban: string;
  /**
   * Currency as defined by ISO 4217
   * @example "CZK"
   */
  currency: string;
  /**
   * Value date of the transaction
   * @format date
   * @example "2020-12-21"
   */
  valueDate?: string;
  /**
   * Booking date of the transaction
   * @format date
   * @example "2020-12-21"
   */
  bookingDate: string;
  /** Transaction amount in specified currency */
  amount?: number;
  /** Counter party account number */
  counterAccount?: string;
  /** Counter party name */
  counterName?: string;
  /** Remittance information */
  remittanceInfo?: string;
}

export interface MerchantStatutoryRepresentative {
  /**
   * Unique identifier of the representative
   * @format uuid
   */
  id?: string;
  /**
   * First name
   * @maxLength 64
   */
  firstName?: string;
  /**
   * Last name
   * @maxLength 64
   */
  lastName?: string;
  /**
   * Date of birth
   * @format date
   * @example "2020-12-21"
   */
  dob?: string;
  /**
   * Two-letter country code as defined by ISO 3166-1 alpha-2
   * @minLength 2
   * @maxLength 2
   */
  country?: string;
  /** Boolean flag indicating if KYC verification is valid */
  kycValid?: boolean;
  /**
   * Email address
   * @format email
   */
  email?: string;
  /**
   * Phone number in international format E.123
   * @maxLength 24
   */
  phone?: string;
}

export interface PartnerOffer {
  /**
   * Unique identifier of the offer
   * @format uuid
   */
  id?: string;
  /** Available financing products */
  products?: PartnerOfferOfferProduct[];
  /** A reason if the customer is not eligible for an offer */
  reason?: string;
}

export interface PartnerOfferOfferProduct {
  /** Product type */
  product?: ProductType;
  /** Minimum financing amount for the given product in local currency */
  minAmount?: number;
  /** Maximum financing amount for the given product in local currency */
  maxAmount?: number;
  /**
   * Currency as defined by ISO 4217 (https://en.wikipedia.org/wiki/ISO_4217)
   * @example "CZK"
   */
  currency: string;
  /** Fee rate percentage [%] */
  ratePerc?: number;
  balloon?: boolean;
  /**
   * Total number of installments
   * @format int32
   */
  installmentCount?: number;
  /** Indicating whether prolongation is available for this product */
  prolongationEnabled?: boolean;
  /** Indicating whether postponement is available for this product */
  postponeEnabled?: boolean;
  /**
   * Maximum number of postponed installments
   * @format int32
   */
  maxPostponeLength?: number;
  /**
   * Maximum number of installments for prolongation
   * @format int32
   */
  maxProlongationLength?: number;
  interestRateMultiplier?: number;
  postponeFeeMultiplier?: number;
  prolongationFeeMultiplier?: number;
}

export interface PartnerProductParams {
  /** Financing product type */
  type: ProductType;
  /** Financing amount */
  amount: number;
  /**
   * Currency as defined by ISO 4217
   * @example "CZK"
   */
  currency: string;
  /**
   * Postponed months
   * @format int32
   */
  postponedPeriods?: number | null;
  /** Boolean flag for financing prolongation */
  prolonged?: boolean | null;
}

export interface PaymentInstruction {
  /**
   * Bank account number for installment repayment
   * @maxLength 34
   * @example "CZ6508000000192000145399"
   */
  iban?: string;
  /**
   * Bank account number for installment repayment
   * @maxLength 64
   * @example "19-2000145399/0800"
   */
  bban?: string;
  /**
   * Payment reference (symbol)
   * @maxLength 10
   */
  reference?: string;
  /** Payment amount */
  amount?: number;
  /**
   * Installment due date
   * @format date
   * @example "2020-12-21"
   */
  dueDate?: string;
}

export interface Product {
  type: ProductType;
  baloon?: boolean;
  /** @format int32 */
  installmentCount: number;
  prolongationEnabled: boolean;
  postponeEnabled: boolean;
  /** @format int32 */
  maxPostponeLength: number;
  /** @format int32 */
  maxProlongationLength: number;
  interestRateMultiplier: number;
  postponeFeeMultiplier: number;
  prolongationFeeMultiplier: number;
}

export enum ProductType {
  M1 = 'M1',
  M3 = 'M3',
  M6 = 'M6',
  M12 = 'M12',
}

export interface ServiceActivated {
  /**
   * Unique identifier of the customer
   * @format uuid
   * @minLength 1
   */
  id: string;
}

export interface ServiceActivationRequest {
  /**
   * Identifier of the partner assigned during Partner API activation
   * @minLength 1
   * @maxLength 32
   */
  partnerCode: string;
  /**
   * Identifier of the customer in partner's system
   * @minLength 1
   * @maxLength 256
   */
  merchantId: string;
  /**
   * Optional attribute to represent nested customer structure in partner's systems (e.g. branch, project, etc)
   * @maxLength 256
   */
  tenantId?: string;
  /**
   * Feed URL to retrieve transaction data from partner's system
   * @maxLength 256
   */
  feedUrl?: string;
  /** Company information */
  company: ServiceActivationRequestCompany;
  /** Company's representative information */
  representative?: ServiceActivationRequestRepresentative;
}

export interface ServiceActivationRequestCompany {
  /**
   * Identification number of the company in business register
   * @minLength 1
   * @maxLength 32
   */
  businessId: string;
  /**
   * Two-letter country code as defined by ISO 3166-1 alpha-2
   * @minLength 2
   * @maxLength 2
   * @example "CZ"
   */
  country: string;
  /**
   * Bank account number for financing disbursement
   * @maxLength 34
   */
  iban?: string;
  /**
   * URL of company's website
   * @maxLength 128
   */
  web?: string;
  /**
   * Email address
   * @format email
   */
  email?: string;
  /**
   * Phone number in international format E.123
   * @maxLength 24
   */
  phone?: string;
  /**
   * Product category
   * @maxLength 256
   */
  productCategory?: string;
}

export interface ServiceActivationRequestRepresentative {
  /**
   * First name
   * @minLength 1
   * @maxLength 64
   */
  firstName: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 64
   */
  lastName: string;
  /**
   * Date of birth
   * @format date
   * @example "2020-12-21"
   */
  dob?: string;
  /**
   * Two-letter country code as defined by ISO 3166-1 alpha-2
   * @minLength 2
   * @maxLength 2
   * @example "CZ"
   */
  country?: string;
  /**
   * Email address
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * Phone number in international format E.123
   * @maxLength 24
   */
  phone?: string;
}
