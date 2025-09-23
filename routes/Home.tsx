import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { useData } from "../context/data";
import { toLocalCurrency } from "../helpers";
import Dialog from "react-native-dialog";
import CircularProgressBar from "../components/CircularProgressBar";
import { Expence, Loan, RecurringExpence } from "../types";

function Card({ children, title, body, color, backgroundColor }: any) {
  return (
    <View style={{ display: "flex", width: "100%", flexDirection: "row", gap: 15, backgroundColor: backgroundColor, padding: 15 }}>
      {children}
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 14, color: color }}>{title}</Text>
        <Text>{body}</Text>
      </View>
    </View>
  )
}

function ProgressCard({ backgroundColor, color, progress, title, body }: any) {
  return (
    <Card title={title} body={body} color={color} backgroundColor={backgroundColor}>
      <CircularProgressBar color={color} strokeWidth={3} radius={25} progress={progress} />
    </Card>
  )
}

function IconCard({ icon, backgroundColor, color, progress, title, body }: any) {
  return (
    <Card title={title} body={body} color={color} backgroundColor={backgroundColor}>
      <CircularProgressBar color={color} strokeWidth={3} radius={25} progress={progress} />
    </Card>
  )
}

const colors = [
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
];

const series = [
  { value: 430, color: '#fbd203', label: { text: 'A', fontWeight: 'bold' } },
  { value: 430, color: '#0345fbff', label: { text: 'B', fontWeight: 'bold' } },
  { value: 430, color: '#03fb0fff', label: { text: 'C', fontWeight: 'bold' } },
]



export function Home(props: any) {
  const { state, deleteItem } = useData();
  const budget = 28000;

  function getTotalAmountByCategory(category: string): number {
    return state.expences
      .filter(expence => expence.category.includes(category))
      .reduce((total, expence) => total + expence.amount, 0);
  }

  function calculatePrecentageOfBudgetFromCategory(category: string): number {
    const ammountFromCategory = getTotalAmountByCategory(category);
    const precentageSpentFromTotal = ammountFromCategory / budget;
    return Math.round(precentageSpentFromTotal * 100);
  }

  function precentageSpentOfBudget() {
    const expences = state.expences.reduce((total, expence) => total + expence.amount, 0);
    const whatIsLeft = budget - expences;
    const precentage = Math.round((whatIsLeft / budget) * 100);
    return 100 - precentage;
  }

  function budgetLeft() {
    const expences = state.expences.reduce((total, expence) => total + expence.amount, 0);
    const whatIsLeft = budget - expences;
    return whatIsLeft;
  }
  return (
    <ScrollView>
      <View style={{ marginVertical: 30 }}>
        <CircularProgressBar progress={precentageSpentOfBudget()} color="pink" title="Budget spent" />
        <Text style={{ textAlign: "center", paddingTop: 15, fontSize: 18 }}>{`Du har ${toLocalCurrency(budgetLeft())} kvar.`}</Text>
        <Text style={{ textAlign: "center", paddingVertical: 0, fontSize: 16, opacity: 0.7 }}>Du spenderar {toLocalCurrency(Math.round(state.expences.reduce((total, expence) => total + expence.amount, 0) / 30))} per dag</Text>

      </View>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {state.categories.map((category, index) => {
          return <ProgressCard title={category} key={index} body="Precentage spent on food this month." color={colors[index]} progress={calculatePrecentageOfBudgetFromCategory(category)} backgroundColor={index % 2 ? "white" : "#eaeaea"} />

        })}
      </View>

      <View>
        {state.expences.map((expence: Expence, index: number) => {
          return (<TouchableOpacity onLongPress={() => deleteItem("expence", expence.id)} key={`expence-${index}`} style={{ width: "100%", padding: 15, backgroundColor: index % 2 ? '#eaeaea' : '#ffffff', display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ width: "33%" }}>{expence.category && expence.category.map((category, index) => category + (index <= expence.category.length - 2 ? ", " : ""))}</Text>
            <Text style={{ width: "33%", textAlign: "center" }}>{expence.message}</Text>
            <Text style={{ width: "33%", textAlign: "right" }}>{toLocalCurrency(expence.amount)}</Text>
          </TouchableOpacity>);
        })}
      </View>
      {/* <ScrollView style={{ borderBottomWidth: 1, borderBottomColor: "black" }}>
        {state.loans.map((expence: Loan, index: number) => {
          return (<TouchableOpacity onLongPress={() => deleteItem("loan", expence.id)} key={`expence-${index}`} style={{ width: "100%", padding: 15, backgroundColor: index % 2 ? '#eaeaea' : '#ffffff', display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ width: "33%", textAlign: "left" }}>{expence.name}</Text>
            <Text style={{ width: "33%", textAlign: 'center' }}>13 000 / Month</Text>
            <Text style={{ width: "33%", textAlign: "right" }}>{toLocalCurrency(expence.total)}</Text>
          </TouchableOpacity>);
        })}
      </ScrollView>
      <ScrollView style={{ borderBottomWidth: 1, borderBottomColor: "black" }}>
        {state.recurringExpences.map((expence: RecurringExpence, index: number) => {
          return (<TouchableOpacity onLongPress={() => deleteItem("recurringExpence", expence.id)} key={`expence-${index}`} style={{ width: "100%", padding: 15, backgroundColor: index % 2 ? '#eaeaea' : '#ffffff', display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ width: "33%", textAlign: "left" }}>{expence.message}</Text>
            <Text style={{ width: "33%", textAlign: 'center' }}>13 000 / Month</Text>
            <Text style={{ width: "33%", textAlign: "right" }}>{toLocalCurrency(expence.amount)}</Text>
          </TouchableOpacity>);
        })}
      </ScrollView>
      <ScrollView>
        {state.expences.map((expence: Expence, index: number) => {
          return (<TouchableOpacity onLongPress={() => deleteItem("expence", expence.id)} key={`expence-${index}`} style={{ width: "100%", padding: 15, backgroundColor: index % 2 ? '#eaeaea' : '#ffffff', display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ width: "33%" }}>{expence.category && expence.category.map((category, index) => category + (index <= expence.category.length - 2 ? ", " : ""))}</Text>
            <Text style={{ width: "33%", textAlign: "center" }}>{expence.message}</Text>
            <Text style={{ width: "33%", textAlign: "right" }}>{toLocalCurrency(expence.amount)}</Text>
          </TouchableOpacity>);
        })}
      </ScrollView>
      <View style={{ padding: 15, display: "flex", alignItems: "flex-end", backgroundColor: "#eaeaea" }}>
        <Text>Total: {toLocalCurrency(state.expences.reduce((sum, obj) => sum + obj.amount, 0))}</Text>
      </View> */}
    </ScrollView>
  );
}
