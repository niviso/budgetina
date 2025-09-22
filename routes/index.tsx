import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "../context/router";
import { Expence } from "./Expence";
import { Home } from "./Home";
import { Loans } from "./Loans";
import { BlurView } from 'expo-blur';
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import DropdownMenu from '../components/DropDownMenu';
const routes: Function[] = [Home, Expence, Loans]




export default function Router() {
  const { state: RouterState, goTo, getHistory, clearHistory, goBack } = useRouter();

  const options = [
    { label: 'Expence', value: '1', trigger: () => goTo("Expence") },
    { label: 'Loan', value: '2', trigger: () => goTo("Loans") },
  ];
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ height: 115, backgroundColor: "#eaeaea", display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: 15, flexDirection: "row", width: "100%" }}>
        <TouchableOpacity style={{ width: "33%", opacity: getHistory().length > 0 ? 1 : 0 }} onPress={() => goBack()}><Text style={{ fontSize: 20, textAlign: "left" }}>Back</Text></TouchableOpacity>
        <Text style={{ fontSize: 24, width: "33%", textAlign: "center", fontWeight: "bold" }}>{RouterState.path}</Text>

        <DropdownMenu
          options={options}
          direction="down"
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 22, width: "100%", textAlign: "right" }}>Add</Text>
          </View>
        </DropdownMenu>

      </View>
      {
        routes.map((Component: any, index: number) => {
          if (Component.name == RouterState.path) {
            return <Component key={index} />
          }
        })
      }
    </View>
  )
}