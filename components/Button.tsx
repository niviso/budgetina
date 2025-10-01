import { TouchableOpacity, Text } from "react-native";
import { FONT_SIZE, SPACING } from "../helpers/constants";
import Interaction from "../helpers/Interaction";

export default function Button({ onPress, title }: any) {

  function _onPress(){
    Interaction.success();
    onPress();
  }
  return (
    <TouchableOpacity onPress={_onPress} style={{ marginTop: SPACING.MD, width: "100%", borderRadius: SPACING.MD, padding: SPACING.MD, backgroundColor: "#8dd5ddff" }}>
      <Text style={{ textAlign: "center", fontSize: FONT_SIZE.LG }}>{title}</Text>
    </TouchableOpacity>
  );
}
