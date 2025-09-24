import { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { FONT_SIZE, SPACING } from "../helpers/constants";
import BaseComponentWrapper from "../routes/BaseComponentWrapper";
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
    <BaseComponentWrapper>
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleText}>{title}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#00ff99ff' }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled} />
    </View>
    </BaseComponentWrapper>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.MD,
  },
  toggleText: {
    fontSize: FONT_SIZE.LG,
  },
  container: {
    padding: SPACING.MD,
    gap: SPACING.MD,
  },
  categoryText: {
    padding: 0,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.MD,
  },
  submitButton: {
    backgroundColor: "#ea99ea",
    padding: SPACING.MD,
    marginTop: SPACING.MD,
    borderRadius: SPACING.MD,
    display: "flex",
    alignItems: "center",
  },
});
