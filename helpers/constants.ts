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

const FONT_SIZE = {
    SM: 12,
    MD: 16,
    LG: 22,
    XL: 32
} as const

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

const COLORS = [
  "#2677d2",
  "#6e25c0",
  "#76c127ff",
  "#c88d22",
  "#d234a9",
  "#812bd2",
  "#23d191",
  "#cd2940",
  "#d2296e",
  "#20c4c4",
  "#d25a25",
  "#4ed217",
  "#d21c25",
  "#2598d2",
  "#c6d220",
  "#14d2a1",
  "#d25e17",
  "#d23315",
  "#3952d2",
  "#1fd27c",
] as const;


export { LOAN_TYPES, SPACING, STEP, INITIAL_LOAN_VALUES, COLORS, FONT_SIZE }