import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";


export default function Collapsable({ title, body, children, open }: any) {
  const [collapsed, setCollapsed] = useState(open);
  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View style={{ padding: 15, backgroundColor: "#eaeaea", display: "flex", gap: 15, marginTop: 15, justifyContent: "space-between", flexDirection: "row", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: collapsed ? 10 : 0, borderBottomRightRadius: collapsed ? 10 : 0 }}>

          <Text style={{ fontWeight: "bold" }}>{title}</Text>
          {collapsed ? <FontAwesome6 iconStyle="solid" size={15} name="chevron-down" /> : <FontAwesome6 iconStyle="solid" size={15} name="chevron-up" />}
        </View>
      </TouchableOpacity>
      {!collapsed && <View>
        <View style={{ padding: 15, backgroundColor: "#eaeaea", display: "flex", gap: 15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          <Text>{body}</Text>
          {children}
        </View>

      </View>}
    </View>
  );
}
