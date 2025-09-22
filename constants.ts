const LOAN_TYPES = [
    "Payday loan",
    "House Mortgage",
    "Student loan",
    "BNPL loan",
    "Blanco loan",
] as const;

const SPACING = {
    SM: 5,
    MD: 10,
    LG: 15,
    XL: 30
} as const;

const STEP = {
    ONE_TENTH: 0.1,
    QUARTER: 0.25,
    HALF: 0.5,
    FULL: 1

}

const INITIAL_LOAN_VALUES = {
    INTREST_RATE: 3,
    LOAN: 3000000,
    AMORTIZATION_RATE: 2,
    LOAN_NAME: "My house loan",
    PAYMENT_DATE: 25,
    LOAN_DURATION: 60,
} as const;


export { LOAN_TYPES, SPACING, STEP, INITIAL_LOAN_VALUES }