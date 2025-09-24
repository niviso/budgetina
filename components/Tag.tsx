import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Interaction from '../helpers/Interaction';
export function Tag({ title, onSelect, onDeselect, color="green", icon='cat' }: any) {
  const [selected, setSelected] = useState(false);
  const windowWidth = (Dimensions.get('window').width / 5) - 15;

  useEffect(() => {
    if (selected) {
      onSelect(title);
      Interaction.on();
    } else {
      onDeselect && onDeselect(title);
      Interaction.off();
    }
  }, [selected]);

  return (
    <TouchableOpacity onPress={() => setSelected(!selected)} style={{display: "flex", alignItems: "center", gap: 5}}>
      <View style={{borderRadius: "100%", width: windowWidth, height: windowWidth, backgroundColor: selected ? color : "#eaeaea", display: "flex", alignItems: "center", justifyContent:"center"}}>
            <FontAwesome6 name={icon} size={25} color={selected ? "#eaeaea" : color} />
      </View>
      <Text style={{fontWeight: selected ? 600 : 400  }}>{title}</Text>
    </TouchableOpacity>
  );
}
