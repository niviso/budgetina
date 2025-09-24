import { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import BaseComponentWrapper from '../routes/BaseComponentWrapper';
import { FONT_SIZE, SPACING } from '../helpers/constants';
export default function Input({ onChangeText, placeholder, icon, defaultValue, type, title, formatOnChange }: any) {
  const [value, setValue] = useState(defaultValue);
  function _onChange(e: string) {
    if (formatOnChange) {
      const newValue = formatOnChange(e);
      setValue(newValue);
    } else {
      setValue(e);

    }
    onChangeText(e);
  }

  useEffect(() => {
    if (formatOnChange) {
      const newValue = formatOnChange(value);
      setValue(newValue);
    }
  }, []);

  const style = StyleSheet.create({
    input: { borderBottomWidth: 1, borderColor: "rgba(0,0,0,1)", padding: SPACING.SM, fontSize: FONT_SIZE.MD }
  });
  return (
    <BaseComponentWrapper title={title} icon={icon}>
      <TextInput textContentType="creditCardGivenName" style={style.input} keyboardType={type} onChangeText={(e) => _onChange(e)} placeholder={placeholder} value={value} />
    </BaseComponentWrapper>
  );
}


