import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { toLocalCurrency } from "../helpers";
import Input from "../components/Input";
import InputSlider from "../components/InputSlider";
import Button from "./Button";
import Collapsable from "./Collapsable";
import { useData } from "../context/data";
import { useRouter } from "../context";
import DateTimePicker from "../components/DateTimePicker";
import { getTimestamp } from "../helpers";
import BaseComponentWrapper from "./BaseComponentWrapper";
import { Tag } from "../components/Tag";
import { calculateLoanCost } from "../helpers/loans";
export function Loans() {
  const [intrest, setIntrest] = useState<number>(3);
  const [loan, setLoan] = useState<number>(2000000);
  const [amorizationRate, setAmorizationRate] = useState<number>(2);
  const [loanName, setLoanName] = useState<string>("");
  const [paidEarlier, setPaidEarlier] = useState<number>(0);
  const [created, setCreated] = useState<string>(getTimestamp());
  const [paymentDate, setPaymentDate] = useState<number>(1);
  const [loanDuration, setLoanDuration] = useState<number>(50);
  const [monthsInFuture, setMonthsInFuture] = useState<number>(0);
  const [selectedLoanType, setSelectedLoanType] = useState<string>("");

  const { goTo } = useRouter();
  const { newLoan } = useData();

  const loanTypes: string[] = [
    "Payday loan",
    "House Mortgage",
    "Student loan",
    "BNPL loan",
    "Blank loan"
  ];

  const loanDetails = calculateLoanCost(loan, paidEarlier, intrest, amorizationRate, loanDuration);

  function getLoanStats() {
    const date = new Date("2025");
    const currentMonth = date.getMonth();
    date.setMonth(currentMonth + monthsInFuture);
    return (
      <View style={{ gap: 15 }}>
        <Text style={{ fontSize: 16 }}>See what your loan will cost in the future.</Text>
        <InputSlider icon="wave-square" title={date.toISOString().split("T")[0].substring(0, 7)} suffix=" months in the future" defaultValue={monthsInFuture} min={0} max={loanDetails.schedule.length - 1} step={1} onChange={setMonthsInFuture} />
        <Text style={{ fontSize: 16 }}>Payment: {toLocalCurrency(loanDetails.schedule[monthsInFuture].payment)}</Text>
        <Text style={{ fontSize: 16 }}>Remaning balance: {toLocalCurrency(loanDetails.schedule[monthsInFuture].remainingBalance)}</Text>
      </View>
    )
  }

  function addLoan() {
    newLoan({
      name: loanName,
      amortization: amorizationRate,
      intrest: intrest,
      total: loan,
      created: created,
      paymentDate: 25
    });
    goTo("Home");
  }

  const formatCurrency = (number: string): string => {
    const no = number.toString().replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return no;
  };

  const setDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;
  };
  return (
    <ScrollView style={{paddingBottom: 300}}>
      <View style={{ backgroundColor: "lightblue", padding: 15 }}>
        <Text style={{ fontSize: 22, fontWeight: 600 }}>
          Loan calculator
        </Text>
        <Text style={{ marginTop: 15, fontSize: 18, lineHeight: 25 }}>
          This loan calculator is a handy tool that helps you estimate your monthly loan payments, total interest, and repayment schedule based on the loan amount, interest rate, and loan term. It’s perfect for planning mortgages, car loans, personal loans, or any other type of installment loan.
        </Text>
      </View>
      <View style={{ padding: 15, gap: 15 }}>
        <Collapsable title="Loan base stats">
          <Input icon="landmark" title="Loan name" defaultValue={loanName.toString()} onChangeText={setLoanName} />
          <Input icon="landmark" title="Original loan" formatOnChange={formatCurrency} defaultValue={loan.toString()} onChangeText={(e: string) => setLoan(parseInt(e.replace(" ", "")))} />
          <Input icon="landmark" title="Money already paid off" formatOnChange={formatCurrency} defaultValue={paidEarlier.toString()} onChangeText={(e: string) => setPaidEarlier(parseInt(e.replace(" ", "")))} />

        </Collapsable>
        <Collapsable title="Loan type">

          <BaseComponentWrapper icon="landmark">
            <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: 15 }}>
              {
                loanTypes.map((loanType: string, index: number) => (
                  <TouchableOpacity onPress={() => setSelectedLoanType(loanType)} key={`loan-type-${index}`} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 15, width: "100%" }}>
                    <View style={{ borderRadius: "100%", borderWidth: 2, width: 20, height: 20, backgroundColor: selectedLoanType == loanType ? "black" : "white" }} />
                    <Text style={{ fontSize: 16 }}>{loanType}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </BaseComponentWrapper>
        </Collapsable>
        <Collapsable title="Rates and duration">
          <InputSlider icon="wave-square" title="Intrest rate" suffix="%" defaultValue={intrest.toString()} min={0} max={25} step={0.1} onChange={setIntrest} />
          <InputSlider icon="wave-square" title="Amortization rate" suffix="%" defaultValue={amorizationRate} min={1} max={25} step={0.1} onChange={setAmorizationRate} />
          <DateTimePicker title="Start date" onChange={(value: string) => setCreated(value)} />
          <InputSlider icon="money-bill" title="Loan duration" suffix=" years" defaultValue={loanDuration.toString()} min={1} max={50} step={1} onChange={setLoanDuration} />

          <InputSlider min={1} max={31} step={1} defaultValue={25} prefix="On the " suffix="th each month." onChange={setPaymentDate} title="Due date" />
        </Collapsable>
        <Collapsable title="Loan rules" body="Extra rules set for adjustments of the loan">
          <InputSlider icon="money-bill" title="Intrest rate deduction" defaultValue={intrest.toString()} min={0} max={100} step={0.5} onChange={setIntrest} />
          <Input icon="landmark" title="Intrest rate deduction roof" formatOnChange={formatCurrency} defaultValue={loan.toString()} onChangeText={(e: string) => setLoan(parseInt(e.replace(" ", "")))} />
        </Collapsable>
        <Collapsable title="Loan information & stats" body={getLoanStats()} />

        <Button title="Add loan" onPress={addLoan} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
