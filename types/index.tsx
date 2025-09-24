export interface Expence {
    id: number;
    amount: number;
    category: string[];
    message: string;
    created: string;
}
export interface RecurringExpence {
    id: number;
    amount: number;
    category: string[];
    message: string;
    created: string;
    active: boolean;
    deploy: "weekly" | "monthly" | "yearly";
    deployDate: string;
}
export interface DropDownMenuOptionsType{
    label: string;
    value: string;
    trigger: Function;
}
export interface Loan {
    id: number;
    total: number;
    intrest: number;
    amortization: number;
    intrestHistory: number[];
    name: string;
    created: string;
    paymentDate: number;
}

export interface Store {
    name: string;
    id: number;
    category: string[];
    created: string;
}
