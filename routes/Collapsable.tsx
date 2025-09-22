import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface CollapsibleProps {
  title: string;
  body?: string;
  children?: React.ReactNode;
  open?: boolean;
}

export default function Collapsible({ title, body, children, open = false }: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState(open);

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View style={[
          styles.header,
          {
            borderBottomLeftRadius: collapsed ? 10 : 0,
            borderBottomRightRadius: collapsed ? 10 : 0,
          }
        ]}>
          <Text style={styles.title}>{title}</Text>
          {collapsed ? (
            <FontAwesome6 name="chevron-down" size={15} style={styles.icon} />
          ) : (
            <FontAwesome6 name="chevron-up" size={15} style={styles.icon} />
          )}
        </View>
      </TouchableOpacity>
      {!collapsed && (
        <View style={styles.content}>
          {body && <Text style={styles.bodyText}>{body}</Text>}
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: "#eaeaea",
    display: "flex",
    gap: 15,
    marginTop: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: "bold",
  },
  icon: {
    alignSelf: "center",
  },
  content: {
    padding: 15,
    backgroundColor: "#eaeaea",
    display: "flex",
    gap: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bodyText: {
    fontSize: 16,
  },
});
