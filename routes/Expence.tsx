import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../components/Input';
import { Tag } from '../components/Tag';
import { useRouter } from '../context';
import { useData } from '../context/data';
import Toggle from '../components/Toggle';
import { FONT_SIZE, SPACING, COLORS } from '../helpers/constants';
import BaseComponentWrapper from './BaseComponentWrapper';
import Button from '../components/Button';
export function Expence() {
  const [input, setInput] = useState('');
  const [inputAmount, setInputAmount] = useState('0');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const { goTo } = useRouter();
  const { state, newExpence, newRecurringExpence, addCategory } = useData();

  const submit = () => {
    const amount = parseInt(inputAmount);
    if (isRecurring) {
      newRecurringExpence(input, amount, selectedCategories);
    } else {
      newExpence(input, amount, selectedCategories);
    }
    goTo('Home');
  };

  const deselect = (category: string) => {
    if (selectedCategories.length > 1) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };
  const categories = [
    {
      icon: 'cat',
      color: 'green',
      title: 'Cat',
    },
    {
      icon: 'bowl-food',
      color: 'yellow',
      title: 'Groceries',
    },
    {
      icon: 'utensils',
      color: 'green',
      title: 'Eating-out',
    },
    {
      icon: 'train',
      color: 'green',
      title: 'Transport',
    },
    {
      icon: 'person',
      color: 'green',
      title: 'Personal',
    },
  ];

  return (
    <View style={styles.container}>
      <Input
        type="default"
        title="What was the expence?"
        placeholder=""
        onChangeText={setInput}
        value={input}
      />
      <Input
        type="numeric"
        title="Amount"
        placeholder="Amount"
        onChangeText={setInputAmount}
        value={inputAmount}
      />

      <BaseComponentWrapper title="Category">
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <View
              style={{
                width: '25%',
                display: 'flex',
                alignItems: 'center',
                paddingTop: 15,
              }}
            >
              <Tag
                key={`category-${index}`}
                title={category.title}
                icon={category.icon}
                color={COLORS[index]}
                onSelect={(e: string) =>
                  setSelectedCategories([...selectedCategories, e])
                }
                onDeselect={deselect}
              />
            </View>
          ))}
        </View>
      </BaseComponentWrapper>
      <Toggle title="Recurring expense" onChange={setIsRecurring} />

      <Button onPress={submit} title="Submit expence" />
    </View>
  );
}
const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.MD,
    paddingBottom: SPACING.MD,
  },
  toggleText: {
    fontSize: FONT_SIZE.MD,
  },
  container: {
    padding: SPACING.MD,
    gap: SPACING.MD,
  },
  categoryText: {
    padding: 0,
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  submitButton: {
    backgroundColor: '#ea99ea',
    padding: SPACING.MD,
    marginTop: SPACING.MD,
    borderRadius: SPACING.MD,
    display: 'flex',
    alignItems: 'center',
  },
});
