import { TouchableOpacity, Text } from "react-native";
import { FONT_SIZE, SPACING } from "../helpers/constants";


export default function Button({ onPress, title }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: SPACING.MD, width: "100%", borderRadius: 20, padding: SPACING.MD, backgroundColor: "#8dd5ddff" }}>
      <Text style={{ textAlign: "center", fontSize: FONT_SIZE.MD }}>{title}</Text>
    </TouchableOpacity>
  );
}
