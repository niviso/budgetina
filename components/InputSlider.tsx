import Slider from '@react-native-community/slider';
import { useState } from 'react';
import BaseComponentWrapper from '../routes/BaseComponentWrapper';
export default function InputSlider({ prefix='', suffix='', min, max, defaultValue, onChange, title, step, icon }: any) {
  const [value, setValue] = useState<number>(defaultValue);
  function _onChange(e: number) {
    const fixedLength = step.toString().split(".");
    const rounded = e.toFixed(fixedLength[1]?.length || 0);
    setValue(rounded);
    onChange(rounded);
  }

  return (
    <BaseComponentWrapper title={`${title}: ${prefix}${value}${suffix}`} icon={icon}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          value={value}
          step={step || 1}
          maximumTrackTintColor="#aaaaaaff"
          minimumTrackTintColor="#006affff"
          onValueChange={_onChange} />
    </BaseComponentWrapper>
  );
}
