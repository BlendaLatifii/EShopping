export interface AddPaymentRequestDto{
    paymentMethodId: string;
    orderId:string;
    cartNumber:string;
    cVV:string;
    amount:number;
}