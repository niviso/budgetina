import { View, Text, StyleSheet } from "react-native";
import CircularProgressBar from "../components/CircularProgressBar";
import { FONT_SIZE, SPACING } from "../helpers/constants";

export function Card({ children, title, body, color, backgroundColor }: any) {
  // Styles object
  const styles = StyleSheet.create({
    cardContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      gap: SPACING.MD,
      padding: SPACING.MD,
    },
    cardTextContainer: {
      display: "flex",
    },
    cardTitle: {
      fontWeight: "bold",
      fontSize: FONT_SIZE.MD,
    },
    cardBody: {
      fontSize: FONT_SIZE.SM,
    },
  });

  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      {children}
      <View style={styles.cardTextContainer}>
        <Text style={[styles.cardTitle, { color }]}>{title}</Text>
        <Text style={styles.cardBody}>{body}</Text>
      </View>
    </View>
  );
}

export function ProgressCard({ backgroundColor, color, progress, title, body }: any) {
  return (
    <Card title={title} body={body} color={color} backgroundColor={backgroundColor}>
      <CircularProgressBar color={color} strokeWidth={3} radius={25} progress={progress} />
    </Card>
  );
}

export function IconCard({ icon, backgroundColor, color, progress, title, body }: any) {
  return (
    <Card title={title} body={body} color={color} backgroundColor={backgroundColor}>
      <CircularProgressBar color={color} strokeWidth={3} radius={25} progress={progress} />
    </Card>
  );
}
