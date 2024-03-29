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
  /** Identification of primary representative. The identity must be specified by Flowpay's internal representative ID. Provided contact information is used to update representative's data in Flowpay's systems. */
  rep1: CreateFinancingRequestRepresentative;
  /** Identification of secondary representative. The identity must be specified by Flowpay's internal representative ID. Provided contact information is used to update representative's data in Flowpay's systems. */
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
  /** Financing purpose. */
  purpose?: string;
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
  /** Result of the scoring process */
  result?: CustomerScoringCompletedResult;
}

export enum CustomerScoringCompletedResult {
  OFFER = "OFFER",
  UNQUALIFIED = "UNQUALIFIED",
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
  isActive?: boolean;
  /**
   * Identifier of the customer
   * @format uuid
   * @minLength 1
   */
  customerId: string;
  /**
   * Identifier of the offer
   * @format uuid
   * @minLength 1
   */
  offerId: string;
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
  /** Total repayment amount. Applicable once the financing is APPROVED. */
  totalRepayment?: number;
  /** Total paid amount. Applicable once the financing is APPROVED. */
  totalPaid?: number;
  /** Total outstanding amount. Applicable once the financing is APPROVED. */
  outstandingAmount?: number;
  /** Installment plan. Applicable once the financing is APPROVED. */
  installments?: FinancingInstallment[];
  /** Payment instruction. Applicable once the financing is DISBURSED. */
  paymentInstruction?: PaymentInstruction;
  prolongationEligible?: boolean;
  /** Prolongation fee if applicable. Applicable once the financing is APPROVED. */
  prolongationFee?: number;
  /** Financing purpose. */
  purpose?: string;
  /**
   * Created at
   * @format ISO 8601
   * @example "2020-12-21T20:20:20.20202Z"
   */
  createdAt?: string;
  /**
   * Updated at
   * @format ISO 8601
   * @example "2020-12-21T20:20:20.20202Z"
   */
  updatedAt?: string;
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
  /** Prolongation or postponement fee */
  feeProlongationOrPostpone?: number;
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
  isActive?: boolean;
}

export interface FinancingSignatures {
  /**
   * Identifier of the financing
   * @format uuid
   * @minLength 1
   */
  id: string;
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
  /** Flag indicating if the 1st representative has already signed the financing contract */
  rep1Signed?: boolean;
  /** Flag indicating if the 2nd representative has already signed the financing contract */
  rep2Signed?: boolean;
  /**
   * Timestamp of 1st representative's signature
   * @format date-time
   */
  rep1SignedAt?: string;
  /**
   * Timestamp of 2nd representative's signature
   * @format date-time
   */
  rep2SignedAt?: string;
}

export enum FinancingState {
  NEW = "NEW",
  SUBMITTED = "SUBMITTED",
  CHECKING = "CHECKING",
  SENT_FOR_APPROVING = "SENT_FOR_APPROVING",
  WAIT_NEW_CONDITIONS = "WAIT_NEW_CONDITIONS",
  APPROVED = "APPROVED",
  CONTRACT_SENT = "CONTRACT_SENT",
  SIGNED = "SIGNED",
  PENDING_DISBURSEMENT = "PENDING_DISBURSEMENT",
  DISBURSED = "DISBURSED",
  PAID = "PAID",
  CLIENT_REFUSED = "CLIENT_REFUSED",
  NOT_APPROVED = "NOT_APPROVED",
  CANCELED = "CANCELED",
  FAILED = "FAILED",
  OVERDUE = "OVERDUE",
  COLLECTION = "COLLECTION",
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
  PENDING = "PENDING",
  PAID = "PAID",
  PLANNED = "PLANNED",
  OVERDUE = "OVERDUE",
  CANCELED = "CANCELED",
  RESCHEDULED = "RESCHEDULED",
  PROLONGED = "PROLONGED",
}

export interface KeyValue {
  key: string;
  value: string;
}

export interface KycStarted {
  token?: string;
}

export interface KycVerificationReviewed {
  /**
   * Identifier of the representative
   * @format uuid
   */
  repId?: string;
  /** KYC verification state */
  state?: KycVerificationReviewedState;
  /**
   * Effective at
   * @format ISO 8601
   * @example "2020-12-21T20:20:20.20202Z"
   */
  effectiveAt?: string;
}

export enum KycVerificationReviewedState {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
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

export enum PartnerConnectionState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface PartnerOffer {
  /**
   * Unique identifier of the offer
   * @format uuid
   */
  id: string;
  /** Available financing products */
  products: PartnerOfferOfferProduct[];
}

export interface PartnerOfferOfferProduct {
  /** Product type */
  product: ProductType;
  /** Minimum financing amount for the given product in local currency */
  minAmount: number;
  /** Maximum financing amount for the given product in local currency */
  maxAmount: number;
  /**
   * Currency as defined by ISO 4217 (https://en.wikipedia.org/wiki/ISO_4217)
   * @example "CZK"
   */
  currency: string;
  /** Fee rate percentage [%] */
  ratePerc: number;
  balloon?: boolean;
  /**
   * Total number of installments
   * @format int32
   */
  installmentCount: number;
  /** Indicating whether prolongation is available for this product */
  prolongationEnabled: boolean;
  /** Indicating whether postponement is available for this product */
  postponeEnabled: boolean;
  /**
   * Maximum number of postponed installments
   * @format int32
   */
  maxPostponeLength: number;
  /**
   * Maximum number of installments for prolongation
   * @format int32
   */
  maxProlongationLength: number;
  interestRateMultiplier: number;
  postponeFeeMultiplier: number;
  prolongationFeeMultiplier: number;
}

export interface PartnerProductParams {
  /** Financing product type */
  type: ProductType;
  /** Financing amount */
  amount: number;
  /** Fee rate percentage [%] */
  ratePerc: number;
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

export interface PartnerService {
  /**
   * Unique identifier of the customer
   * @format uuid
   * @minLength 1
   */
  id: string;
  /**
   * Service activated at
   * @format ISO 8601
   * @example "2020-12-21T20:20:20.20202Z"
   */
  activatedAt?: string;
  /** Service state */
  state?: PartnerConnectionState;
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
   * Currency as defined by ISO 4217
   * @example "CZK"
   */
  currency?: string;
  /**
   * Installment due date
   * @format date
   * @example "2020-12-21"
   */
  dueDate?: string;
}

export interface Product {
  type: ProductType;
  countries: string[];
  currencies: string[];
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
  M1 = "M1",
  M3 = "M3",
  M6 = "M6",
  M12 = "M12",
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
  transactionsUrl?: string;
  /**
   * Feed URL to retrieve bank account data from partner's system
   * @maxLength 256
   */
  accountsUrl?: string;
  /**
   * Feed URL to retrieve merchant's orders data from partner's system
   * @maxLength 1024
   */
  ordersUrl?: string;
  /**
   * Redirect URL to navigate customer to partner's platform UI
   * @maxLength 1024
   */
  redirectUrl?: string;
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
   * @minLength 1
   */
  email: string;
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

export interface UpdateRepresentativeRequest {
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
