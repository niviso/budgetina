import { Text, ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { useData } from "../context/data";
import { toLocalCurrency } from "../helpers/helpers";
import CircularProgressBar from "../components/CircularProgressBar";
import { Expence } from "../types";
import { ProgressCard } from "../components/Card";
import { COLORS,FONT_SIZE,SPACING } from "../helpers/constants";
// Styles object
export const styles = StyleSheet.create({
  progressContainer: {
    marginVertical: SPACING.XL,
    alignItems: "center",
  },
  progressText: {
    textAlign: "center",
    paddingTop: SPACING.MD,
    fontSize: FONT_SIZE.MD,
  },
  progressSubText: {
    textAlign: "center",
    paddingVertical: 0,
    fontSize: FONT_SIZE.MD,
    opacity: 0.7,
  },
  cardsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  expenceRow: {
    width: "100%",
    padding: SPACING.MD,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenceCategory: {
    width: "33%",
  },
  expenceMessage: {
    width: "33%",
    textAlign: "center",
  },
  expenceAmount: {
    width: "33%",
    textAlign: "right",
  },
});

export function Home() {
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
      <View style={styles.progressContainer}>
        <CircularProgressBar progress={precentageSpentOfBudget()} color="pink" title="Budget spent" />
        <Text style={styles.progressText}>{`Du har ${toLocalCurrency(budgetLeft())} kvar.`}</Text>
        <Text style={styles.progressSubText}>Du spenderar {toLocalCurrency(Math.round(state.expences.reduce((total, expence) => total + expence.amount, 0) / 30))} per dag</Text>
      </View>
      <View style={styles.cardsWrapper}>
        {state.categories.map((category, index) => {
          return (
            <ProgressCard
              title={category}
              key={index}
              body="Precentage spent on food this month."
              color={COLORS[index]}
              progress={calculatePrecentageOfBudgetFromCategory(category)}
              backgroundColor={index % 2 ? "white" : "#eaeaea"}
            />
          );
        })}
      </View>
      <View>
        {state.expences.map((expence: Expence, index: number) => {
          return (
            <TouchableOpacity
              onLongPress={() => deleteItem("expence", expence.id)}
              key={`expence-${index}`}
              style={[styles.expenceRow, { backgroundColor: index % 2 ? '#eaeaea' : '#ffffff' }]}
            >
              <Text style={styles.expenceCategory}>
                {expence.category && expence.category.map((category, index) => category + (index <= expence.category.length - 2 ? ", " : ""))}
              </Text>
              <Text style={styles.expenceMessage}>{expence.message}</Text>
              <Text style={styles.expenceAmount}>{toLocalCurrency(expence.amount)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
