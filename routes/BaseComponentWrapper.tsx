import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { View, Text } from "react-native";
import { FONT_SIZE } from "../helpers/constants";

export default function BaseComponentWrapper({ children, title, icon }: any) {
  return (
    <View style={{ }}>
        <Text style={{ fontSize: FONT_SIZE.MD, fontWeight: 600 }}>{title}</Text>
        {children}

    </View>
  );
}
