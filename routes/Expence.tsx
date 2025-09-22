import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../components/Input";
import { Tag } from "../components/Tag";
import { useRouter } from "../context";
import { useData } from "../context/data";
import Toggle from "../components/Toggle";
import AddCategoryButton from "../components/AddCategoryButton";
interface ExpenceProps {
  // Add any props here if needed
}

export function Expence(_props: ExpenceProps) {
  const [input, setInput] = useState("");
  const [inputAmount, setInputAmount] = useState("0");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const { goTo } = useRouter();
  const { state, newExpence, newRecurringExpence, addCategory } = useData();

  const submit = () => {
    const amount = parseInt(inputAmount);
    if (isRecurring) {
      newRecurringExpence(input, amount, selectedCategories);
    } else {
      newExpence(input, amount, selectedCategories);
    }
    goTo("Home");
  };

  const deselect = (category: string) => {
    if (selectedCategories.length > 1) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  return (
    <View style={styles.container}>
      <Input type="default" title="Message" placeholder="Message" onChangeText={setInput} value={input} />
      <Input type="numeric" title="Amount" placeholder="Amount" onChangeText={setInputAmount} value={inputAmount} />
      <Text style={styles.categoryText}>Category</Text>
      <View style={styles.categoriesContainer}>
        {state.categories.map((category, index) => (
          <Tag
            key={`category-${index}`}
            title={category}
            onSelect={(e: string) => setSelectedCategories([...selectedCategories, e])}
            onDeselect={deselect}
          />
        ))}
        <AddCategoryButton onAddCategory={(value:string) => addCategory(value)}/>
      </View>
      <Toggle title="Recurring expense?" onChange={setIsRecurring} />
      <TouchableOpacity onPress={submit} style={styles.submitButton}>
        <Text>Submit expense</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  toggleText: {
    fontSize: 16,
  },
  container: {
    padding: 15,
    gap: 15,
  },
  categoryText: {
    padding: 0,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  submitButton: {
    backgroundColor: "#ea99ea",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
  },
});
