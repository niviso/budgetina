import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { View, Text } from "react-native";

export default function BaseComponentWrapper({ children, title, icon }: any) {
  return (
    <View style={{ }}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{title}</Text>
        {children}

    </View>
  );
}
