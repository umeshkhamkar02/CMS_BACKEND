export interface IBill{
    id?: number;
    uuid?: string;
    name?: string;
    email?: string;
    contactNumber?: string;
    paymentMethod?: string;
    total? : string;
    productDetails?: string;
    createdBy?: number;
}