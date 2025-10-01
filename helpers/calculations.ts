interface MorgageMonthlyCostType {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  date: string;
}
interface MortgageCostType {
  totalPaid: number;
  schedule: MorgageMonthlyCostType[];
  totalLoanCost: number;
}

function calculateMorgageCost(
  initialLoan: number,
  paidOff: number,
  extraAmorizatation: number,
  interestRate: number,
  amortizationRate: number,
  years: number
): MortgageCostType {
  const remainingPrincipal = initialLoan - paidOff;
  const monthlyInterestRate = interestRate / 100 / 12;
  const AmortizationRateDivided = amortizationRate / 100;
  const months = years * 12;
  const startDate = new Date();
  let startYear = startDate.getFullYear();
  let startMonth = startDate.getMonth();
  const yearlyAmortization = initialLoan * AmortizationRateDivided;

  let remainingBalance = remainingPrincipal;
  let totalPaid: number = 0;
  const schedule: MorgageMonthlyCostType[] = [];
  for (let month = 1; month <= months; month++) {
    const monthlyAmortization = (yearlyAmortization / 12) + (extraAmorizatation || 0);
    const monthlyInterest = remainingBalance * monthlyInterestRate;
    const monthlyPayment = monthlyAmortization + monthlyInterest;
    startMonth = startMonth + 1;
    if (startMonth > 12) {
      startYear++;
      startMonth = 1;
    }

    totalPaid += monthlyPayment;
    remainingBalance -= monthlyAmortization;
    if (remainingBalance < monthlyPayment) {
      break;
    }

    schedule.push({
      month: month,
      payment: monthlyPayment,
      principal: monthlyAmortization,
      interest: monthlyInterest,
      remainingBalance: remainingBalance,
      date: `${startYear}-${startMonth}`,
    });
  }

  return {
    totalPaid: totalPaid,
    totalLoanCost: initialLoan - totalPaid,
    schedule,
  };
}

function calculateFixedPaymentCost(
  principal: number,
  annualInterestRate: number,
  months: number
) {
  // Calculate monthly interest rate
  const monthlyInterestRate = annualInterestRate / 12;

  // Calculate monthly payment using the installment loan formula
  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  // Calculate total paid
  const totalPaid = monthlyPayment * months;

  return {
    totalPaid: totalPaid,
    monthlyPayment: monthlyPayment,
  };
}

export { calculateMorgageCost, calculateFixedPaymentCost };
