import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { toLocalCurrency, getTimestamp, formatCurrency } from "../helpers";
import Input from "../components/Input";
import InputSlider from "../components/InputSlider";
import Button from "./Button";
import Collapsable from "./Collapsable";
import { useData } from "../context/data";
import { useRouter } from "../context";
import DateTimePicker from "../components/DateTimePicker";
import BaseComponentWrapper from "./BaseComponentWrapper";
import { calculateLoanCost } from "../helpers/loans";
import { LOAN_TYPES, SPACING, STEP, INITIAL_LOAN_VALUES } from "../constants";


export function Loans() {
  const [intrest, setIntrest] = useState<number>(INITIAL_LOAN_VALUES.INTREST_RATE);
  const [loan, setLoan] = useState<number>(INITIAL_LOAN_VALUES.LOAN);
  const [amorizationRate, setAmorizationRate] = useState<number>(INITIAL_LOAN_VALUES.AMORTIZATION_RATE);
  const [loanName, setLoanName] = useState<string>(INITIAL_LOAN_VALUES.LOAN_NAME);
  const [paidEarlier, setPaidEarlier] = useState<number>(0);
  const [created, setCreated] = useState<string>(getTimestamp());
  const [paymentDate, setPaymentDate] = useState<number>(INITIAL_LOAN_VALUES.PAYMENT_DATE);
  const [loanDuration, setLoanDuration] = useState<number>(INITIAL_LOAN_VALUES.LOAN_DURATION);
  const [monthsInFuture, setMonthsInFuture] = useState<number>(0);
  const [selectedLoanType, setSelectedLoanType] = useState<string>("");

  const { goTo } = useRouter();
  const { newLoan } = useData();
  const loanDetails = calculateLoanCost(loan, paidEarlier, intrest, amorizationRate, loanDuration);

  const getLoanStats = () => {
    const date = new Date("2025");
    const currentMonth = date.getMonth();
    date.setMonth(currentMonth + monthsInFuture);
    const title = date.toISOString().split("T")[0].substring(0, 7);
    return (
      <View style={styles.statsContainer}>
        <InputSlider
          icon="wave-square"
          title={title}
          suffix=" months in the future"
          defaultValue={monthsInFuture}
          min={0}
          max={loanDetails.schedule.length - 1}
          step={STEP.FULL}
          onChange={setMonthsInFuture}
        />
        <Text style={styles.statText}>
          Payment: {toLocalCurrency(loanDetails.schedule[monthsInFuture].payment)}
        </Text>
        <Text style={styles.statText}>
          Remaining balance: {toLocalCurrency(loanDetails.schedule[monthsInFuture].remainingBalance)}
        </Text>
      </View>
    );
  };

  const addLoan = () => {
    newLoan({
      name: loanName,
      amortization: amorizationRate,
      intrest,
      total: loan,
      created,
      paymentDate: 25,
    });
    goTo("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loan calculator</Text>
        <Text style={styles.headerDescription}>
          This loan calculator is a handy tool that helps you estimate your monthly loan payments,
          total interest, and repayment schedule based on the loan amount, interest rate, and loan term.
          It’s perfect for planning mortgages, car loans, personal loans, or any other type of installment loan.
        </Text>
      </View>
      <View style={styles.container}>
        <Collapsable title="Loan base stats" body="Add the basic information about your loan.">
          <Input
            icon="landmark"
            title="Loan name"
            defaultValue={loanName}
            onChangeText={setLoanName}
          />
          <Input
            icon="landmark"
            title="Original loan"
            formatOnChange={formatCurrency}
            defaultValue={loan.toString()}
            onChangeText={(e: string) => setLoan(parseInt(e.replace(" ", "")))}
          />
          <Input
            icon="landmark"
            title="Money already paid off"
            formatOnChange={formatCurrency}
            defaultValue={paidEarlier.toString()}
            onChangeText={(e: string) => setPaidEarlier(parseInt(e.replace(" ", "")))}
          />
        </Collapsable>
        <Collapsable title="Loan type" body="Select the loan type">
          <BaseComponentWrapper icon="landmark">
            <View style={styles.loanTypesContainer}>
              {LOAN_TYPES.map((loanType, index) => (
                <TouchableOpacity
                  key={`loan-type-${index}`}
                  style={styles.loanTypeItem}
                  onPress={() => setSelectedLoanType(loanType)}
                >
                  <View
                    style={[
                      styles.radioButton,
                      { backgroundColor: selectedLoanType === loanType ? "black" : "white" },
                    ]}
                  />
                  <Text style={styles.loanTypeText}>{loanType}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </BaseComponentWrapper>
        </Collapsable>
        <Collapsable title="Rates and duration" body="Add the intrest & amortization rates and your loan duration.">
          <DateTimePicker title="Start date" onChange={setCreated} />
          <InputSlider
            icon="wave-square"
            title="Intrest rate"
            suffix="%"
            defaultValue={intrest.toString()}
            min={0}
            max={25}
            step={STEP.ONE_TENTH}
            onChange={setIntrest}
          />
          <InputSlider
            icon="wave-square"
            title="Amortization rate"
            suffix="%"
            defaultValue={amorizationRate}
            min={1}
            max={25}
            step={STEP.ONE_TENTH}
            onChange={setAmorizationRate}
          />
          <InputSlider
            icon="money-bill"
            title="Loan duration"
            suffix=" years"
            defaultValue={loanDuration.toString()}
            min={1}
            max={50}
            step={STEP.FULL}
            onChange={setLoanDuration}
          />
          <InputSlider
            min={1}
            max={31}
            step={STEP.FULL}
            defaultValue={25}
            prefix="On the "
            suffix="th each month."
            onChange={setPaymentDate}
            title="Due date"
          />
        </Collapsable>
        <Collapsable title="Loan rules" body="Extra rules set for adjustments of the loan">
          <InputSlider
            icon="money-bill"
            title="Intrest rate deduction"
            defaultValue={intrest.toString()}
            min={0}
            max={100}
            step={STEP.HALF}
            onChange={setIntrest}
          />
          <Input
            icon="landmark"
            title="Intrest rate deduction roof"
            formatOnChange={formatCurrency}
            defaultValue={loan.toString()}
            onChangeText={(e: string) => setLoan(parseInt(e.replace(" ", "")))}
          />
        </Collapsable>
        <Collapsable title="Loan information & stats" body="See what your loan will cost in the future">
          {getLoanStats()}
        </Collapsable>
        <Button title="Add loan" onPress={addLoan} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 300,
  },
  header: {
    backgroundColor: "pink",
    padding: SPACING.LG,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  headerDescription: {
    marginTop: SPACING.LG,
    fontSize: 18,
    lineHeight: 25,
  },
  container: {
    padding: SPACING.LG,
    gap: SPACING.LG,
  },
  statsContainer: {
    gap: SPACING.LG,
  },
  statText: {
    fontSize: 16,
  },
  loanTypesContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: SPACING.LG,
  },
  loanTypeItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.LG,
    width: "100%",
  },
  radioButton: {
    borderRadius: 100,
    borderWidth: 2,
    width: 20,
    height: 20,
  },
  loanTypeText: {
    fontSize: 16,
  },
});
