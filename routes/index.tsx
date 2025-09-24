import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from '../context/router';
import { Expence } from './Expence';
import { Home } from './Home';
import { Loans } from './Loans';
import DropdownMenu from '../components/DropDownMenu';
import { DropDownMenuOptionsType } from '../types';
import { FONT_SIZE, SPACING } from '../helpers/constants';
const routes: React.ComponentType[] = [Home, Expence, Loans];

export default function Router() {
  const {
    state: RouterState,
    goTo,
    getHistory,
    clearHistory,
    goBack,
  } = useRouter();

  const options:DropDownMenuOptionsType[] = [
    { label: 'Expense', value: '1', trigger: () => goTo('Expence'), icon: 'money-bill' },
    { label: 'Loan', value: '2', trigger: () => goTo('Loans'), icon: 'vault' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { opacity: getHistory().length > 0 ? 1 : 0 },
          ]}
          onPress={() => goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{RouterState.path}</Text>
        <DropdownMenu options={options} direction="down">
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>Add</Text>
          </View>
        </DropdownMenu>
      </View>
      {routes.map((Component, index) => {
        if (Component.name === RouterState.path) {
          return <Component key={index} />;
        }
        return null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  header: {
    height: 115,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    boxShadow: '0px 5px 15px 0px rgba(255,255,255,1)',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: SPACING.MD,
    flexDirection: 'row',
    width: '100%',
  },
  backButton: {
    width: '33%',
  },
  backButtonText: {
    fontSize: FONT_SIZE.LG,
    textAlign: 'left',
  },
  headerTitle: {
    fontSize: FONT_SIZE.LG,
    width: '33%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    width: '100%',
  },
  addButtonText: {
    fontSize: FONT_SIZE.LG,
    width: '100%',
    textAlign: 'right',
  },
});
