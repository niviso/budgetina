import { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import BaseComponentWrapper from '../routes/BaseComponentWrapper';
import { FONT_SIZE, SPACING } from '../helpers/constants';
import { KeyboardTypeOptions } from 'react-native';
type InputProps = {
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: string;
  defaultValue?: string | number;
  value?: string | number;
  type?: KeyboardTypeOptions;
  title?: string;
  formatOnChange?: (text: string) => string;
};

const style = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: SPACING.LG,
    fontSize: FONT_SIZE.MD,
  },
});

export default function Input({
  onChangeText,
  placeholder,
  icon,
  defaultValue,
  value,
  type,
  title,
  formatOnChange,
}: InputProps) {
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  function _onChange(e: string) {
    const newValue = formatOnChange ? formatOnChange(e) : e;
    setInternalValue(newValue);
    onChangeText(newValue);
  }

  useEffect(() => {
    if (value !== undefined && value !== internalValue) {
      console.log("SET",value);
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (formatOnChange) {
      const newValue = formatOnChange(internalValue as string);
      setInternalValue(newValue);
    }
  }, []);

  return (
    <BaseComponentWrapper title={title} icon={icon}>
      <TextInput
        style={style.input}
        keyboardType={type}
        onChangeText={(e) => _onChange(e)}
        placeholder={placeholder}
        value={internalValue as string}
      />
    </BaseComponentWrapper>
  );
}
