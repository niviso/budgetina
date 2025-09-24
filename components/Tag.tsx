import { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SPACING } from '../helpers/constants';

export function Tag({ title, onSelect, onDeselect }: any) {
  const [selected, setSelected] = useState(false);
  const [color, setColor] = useState(randomHsl(80));
  function randomHsl(light: number): string {
    return 'hsla(' + Math.random() * 360 + ', 100%, ' + light + '%, 1)';
  }

  useEffect(() => {
    if (selected) {
      onSelect(title);
    } else {
      onDeselect && onDeselect(title);
    }
  }, [selected]);

  return (
    <TouchableOpacity onPress={() => setSelected(!selected)}>
      <Text style={{ backgroundColor: color, padding: SPACING.MD, textAlign: "center", borderRadius: SPACING.MD, fontWeight: 600, borderWidth: 1, borderColor: selected ? 'black' : "#eaeaea", opacity: selected ? 0.5 : 1 }}>{title}</Text>
    </TouchableOpacity>
  );
}
