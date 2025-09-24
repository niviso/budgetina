import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FONT_SIZE, SPACING } from "../helpers/constants";
import Interaction from "../helpers/Interaction";

interface CollapsibleProps {
  title: string;
  body?: string;
  children?: React.ReactNode;
  open?: boolean;
}

export default function Collapsible({ title, body, children, open = false }: CollapsibleProps) {
  const [collapsed, setCollapsed] = useState(open);

  function toggle(){
    if(collapsed){
      Interaction.off();
      setCollapsed(false);
    }
    else {
      Interaction.on();
      setCollapsed(true);
    }
  }

  return (
    <View>
      <TouchableOpacity onPress={toggle}>
        <View style={[
          styles.header,
          {
            borderBottomLeftRadius: collapsed ? 10 : 0,
            borderBottomRightRadius: collapsed ? 10 : 0,
          }
        ]}>
          <Text style={styles.title}>{title}</Text>
          {collapsed ? (
            <FontAwesome6 name="chevron-down" anim size={15} style={styles} />
          ) : (
            <FontAwesome6 name="chevron-up" size={15} style={styles} />
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
    padding: SPACING.MD,
    backgroundColor: "#eaeaea",
    display: "flex",
    gap: SPACING.MD,
    marginTop: SPACING.MD,
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
    padding: SPACING.MD,
    backgroundColor: "#eaeaea",
    display: "flex",
    gap: SPACING.MD,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bodyText: {
    fontSize: FONT_SIZE.MD,
  },
});
