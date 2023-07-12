export interface UpdateWalletRequest {
  wage: number;
  saved: number;
  cashValue: number;
  paymentDate: number;
  lastUpdatePaymentDate?: Date;
}
