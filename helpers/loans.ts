
interface MorgageMonthlyCostType{
                month:number;
            payment: number;
            principal: number;
            interest: number;
            remainingBalance: number
}
interface MortgageCostType{
    totalPaid: number;
    schedule: MorgageMonthlyCostType[];
    totalLoanCost: number;
}

function calculateLoanCost(
    initialLoan:number,
    paidOff:number,
    interestRate:number,
    amortizationRate:number,
    years:number
):MortgageCostType {
    const remainingPrincipal = initialLoan - paidOff;
    const monthlyInterestRate = (interestRate/100) / 12;
    const monthlyAmortizationRate = (amortizationRate/100) / 12;
    const months = years * 12;

    let remainingBalance = remainingPrincipal;
    let totalPaid:number = 0;
    const schedule:MorgageMonthlyCostType[] = [];

    for (let month = 1; month <= months; month++) {
        const monthlyAmortization = remainingBalance * monthlyAmortizationRate;
        const monthlyInterest = remainingBalance * monthlyInterestRate;
        const monthlyPayment = monthlyAmortization + monthlyInterest;

        totalPaid += monthlyPayment;
        remainingBalance -= monthlyAmortization;

        schedule.push({
            month: month,
            payment: monthlyPayment,
            principal: monthlyAmortization,
            interest: monthlyInterest,
            remainingBalance: remainingBalance,
        });
    }

    return {
        totalPaid: totalPaid,
        totalLoanCost: (initialLoan - totalPaid),
        schedule,
    };
}

function calculateCreditCost(principal:number,annualInterestRate:number,months:number){


// Calculate monthly interest rate
const monthlyInterestRate = annualInterestRate / 12;

// Calculate monthly payment using the installment loan formula
const monthlyPayment =
  (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
  (Math.pow(1 + monthlyInterestRate, months) - 1);

// Calculate total paid
const totalPaid = monthlyPayment * months;

return {
    totalPaid: totalPaid,
    monthlyPayment: monthlyPayment
}
}

export {calculateLoanCost, calculateCreditCost};