import { TouchableOpacity, Text } from "react-native";


export default function Button({ onPress, title }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 15, width: "100%", borderRadius: 20, padding: 15, backgroundColor: "#8dd5ddff" }}>
      <Text style={{ textAlign: "center", fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  );
}
