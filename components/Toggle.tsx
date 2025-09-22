import { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface ToggleProps {
  title: string;
  onChange: (value: boolean) => void;
}

export default function Toggle({ title, onChange }: ToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsEnabled(value);
    onChange(value);
  };

  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleText}>{title}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#00ff99ff' }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled} />
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
