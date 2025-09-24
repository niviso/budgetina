import { useState } from 'react';
import { View, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import BaseComponentWrapper from '../routes/BaseComponentWrapper';
import { SPACING } from '../helpers/constants';
export default function DateTimePicker({ mode = "date", min, max, defaultValue = new Date(), onChange, title, step }: any) {
  const [value, setValue] = useState(defaultValue);
  function _onChange(event: DateTimePickerEvent, selectedDate: Date | undefined) {
    if (selectedDate) {
      setValue(selectedDate);
      onChange(selectedDate.toISOString());
    }
  }
  return (
    <BaseComponentWrapper title={title}>
      <RNDateTimePicker mode={mode} value={value} onChange={_onChange} style={{ marginLeft: -10, marginTop: SPACING.MD }} />
    </BaseComponentWrapper>
  );
}
