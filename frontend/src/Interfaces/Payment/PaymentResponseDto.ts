export interface PaymentResponseDto{
    id:string;
    paymentMethodId:string;
    paymentMethodName:string;
    transactionDate:Date;
    amount:number;
}