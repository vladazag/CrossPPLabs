export interface IExpirable {
    expiryDate: string;
    isExpired(): boolean;
}