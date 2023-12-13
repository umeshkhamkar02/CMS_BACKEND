export interface IUser {
    id?: number;
    token?: string;
    dbToken?: string;
    name?: string;
    contactNumber?: string;
    emailId?: string;
    password?: string;
    status?: string;
    role?: string;
}


export interface ILoginRequest {
    username?: string;
    password?: string;
}

export interface IDashboard {
    categoryCount?: number;
    productCount?: number;
    billCount?: number;
}