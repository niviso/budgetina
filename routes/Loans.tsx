import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  toLocalCurrency,
  getTimestamp,
  formatCurrency,
} from '../helpers/helpers';
import Input from '../components/Input';
import InputSlider from '../components/InputSlider';
import Button from '../components/Button';
import Collapsable from './Collapsable';
import { useData } from '../context/data';
import { useRouter } from '../context';
import DateTimePicker from '../components/DateTimePicker';
import BaseComponentWrapper from './BaseComponentWrapper';
import { calculateMorgageCost } from '../helpers/calculations';
import {
  LOAN_TYPES,
  SPACING,
  STEP,
  INITIAL_LOAN_VALUES,
  FONT_SIZE,
} from '../helpers/constants';
import { t } from '../locale';

export function Loans() {
  const [intrest, setIntrest] = useState<number>(
    INITIAL_LOAN_VALUES.INTREST_RATE
  );
  const [loan, setLoan] = useState<number>(INITIAL_LOAN_VALUES.LOAN);
  const [extraAmorizatation, setExtraAmorizatation] = useState<number>(0);
  const [assetValue, setAssetValue] = useState<number>(
    INITIAL_LOAN_VALUES.ASSET_VALUE
  );
  const [amorizationRate, setAmorizationRate] = useState<number>(
    INITIAL_LOAN_VALUES.AMORTIZATION_RATE
  );
  const [loanName, setLoanName] = useState<string>(
    INITIAL_LOAN_VALUES.LOAN_NAME
  );
  const [paidEarlier, setPaidEarlier] = useState<number>(
    INITIAL_LOAN_VALUES.LOAN_ALREADY_PAID_OFF
  );
  const [created, setCreated] = useState<string>(getTimestamp());
  const [paymentDate, setPaymentDate] = useState<number>(
    INITIAL_LOAN_VALUES.PAYMENT_DATE
  );
  const [loanDuration, setLoanDuration] = useState<number>(
    INITIAL_LOAN_VALUES.LOAN_DURATION
  );
  const [monthsInFuture, setMonthsInFuture] = useState<number>(0);
  const [selectedLoanType, setSelectedLoanType] = useState<string>('');

  const { goTo } = useRouter();
  const { newLoan } = useData();
  const loanDetails = calculateMorgageCost(
    loan,
    paidEarlier,
    extraAmorizatation,
    intrest,
    amorizationRate,
    loanDuration
  );

  const getLoanStats = () => {
    return (
      <View style={styles.statsContainer}>
        <InputSlider
          icon="wave-square"
          title={loanDetails.schedule[monthsInFuture].date}
          suffix=" months in the future"
          defaultValue={monthsInFuture}
          min={0}
          max={loanDetails.schedule.length - 1}
          step={STEP.FULL}
          onChange={setMonthsInFuture}
        />
        <Text style={styles.statText}>
          Payment:{' '}
          {toLocalCurrency(loanDetails.schedule[monthsInFuture].payment)}
        </Text>
        <Text style={styles.statText}>
          Principal:{' '}
          {toLocalCurrency(loanDetails.schedule[monthsInFuture].principal)}
        </Text>
        <Text style={styles.statText}>
          Intrest:{' '}
          {toLocalCurrency(loanDetails.schedule[monthsInFuture].interest)}
        </Text>
        <Text style={styles.statText}>
          Remaining balance:{' '}
          {toLocalCurrency(
            loanDetails.schedule[monthsInFuture].remainingBalance
          )}
        </Text>
        <Text style={styles.statText}>
          Loan-to-value-ratio:{' '}
          {Math.round(
            (loanDetails.schedule[monthsInFuture].remainingBalance /
              assetValue) *
              100
          )}
          %
        </Text>
      </View>
    );
  };

  const addLoan = () => {
    newLoan({
      name: loanName,
      amortization: amorizationRate,
      intrest,
      total: loan,
      created,
      paymentDate: 25,
    });
    goTo('Home');
  };

  function updateLoan(value: number) {
    if (paidEarlier > value) {
      setPaidEarlier(0);
    }
    setLoan(value);
  }

  function updatePaidEarlier(value: number) {
    if (value > loan) {
      setPaidEarlier(0);
    } else {
      setPaidEarlier(0);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
              <View
        style={{
          paddingHorizontal: SPACING.LG,
          paddingTop: SPACING.XL,
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            paddingBottom: SPACING.MD,
            fontSize: FONT_SIZE.MD,
            letterSpacing: 2,
          }}
        >
          BASIC DETAILS
        </Text>
      </View>
        <Input
          icon="landmark"
          title="Name your loan"
          value={loanName}
          defaultValue={loanName}
          onChangeText={setLoanName}
        />
        <Input
          icon="landmark"
          title="Enter property or asset value"
          value={assetValue}
          formatOnChange={formatCurrency}
          defaultValue={assetValue.toString()}
          onChangeText={(e: string) =>
            setAssetValue(parseInt(e.replace(' ', '')))
          }
        />
        <Input
          icon="landmark"
          title="Original loan ammount"
          value={loan}
          formatOnChange={formatCurrency}
          defaultValue={loan.toString()}
          onChangeText={(e: string) => updateLoan(parseInt(e.replace(' ', '')))}
        />
        <Input
          icon="landmark"
          title="How much have you already paid off your loan?"
          formatOnChange={formatCurrency}
          value={paidEarlier}
          defaultValue={paidEarlier.toString()}
          onChangeText={(e: string) =>
            updatePaidEarlier(parseInt(e.replace(' ', '')))
          }
        />
        <BaseComponentWrapper icon="landmark" title="Set a loan type">
          <View style={styles.loanTypesContainer}>
            {LOAN_TYPES.map((loanType, index) => (
              <TouchableOpacity
                key={`loan-type-${index}`}
                style={styles.loanTypeItem}
                onPress={() => setSelectedLoanType(loanType)}
              >
                <View
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor:
                        selectedLoanType === loanType ? 'black' : 'white',
                    },
                  ]}
                />
                <Text style={styles.loanTypeText}>{loanType}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BaseComponentWrapper>
        <DateTimePicker title="Start date" onChange={setCreated} />
        <InputSlider
          icon="wave-square"
          title="Intrest rate"
          suffix="%"
          defaultValue={intrest.toString()}
          min={0}
          max={25}
          step={STEP.ONE_TENTH}
          onChange={setIntrest}
        />
        <InputSlider
          icon="wave-square"
          title="Amortization rate"
          suffix="%"
          defaultValue={amorizationRate}
          min={1}
          max={25}
          step={STEP.ONE_TENTH}
          onChange={setAmorizationRate}
        />
        <Input
          icon="landmark"
          title="Extra amortization each month"
          formatOnChange={formatCurrency}
          defaultValue={extraAmorizatation.toString()}
          onChangeText={(e: string) =>
            setExtraAmorizatation(parseInt(e.replace(' ', '')))
          }
        />
        <InputSlider
          icon="money-bill"
          title="Loan duration"
          suffix=" years"
          defaultValue={loanDuration.toString()}
          min={1}
          max={50}
          step={STEP.FULL}
          onChange={setLoanDuration}
        />
        <InputSlider
          min={1}
          max={31}
          step={STEP.FULL}
          defaultValue={25}
          prefix="On the "
          suffix="th each month."
          onChange={setPaymentDate}
          title="Due date"
        />
        <Collapsable
          title="Loan information & stats"
          body="See what your loan will cost in the future"
        >
          {getLoanStats()}
        </Collapsable>
        <Button title="Submit" onPress={addLoan} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 300,
  },
  header: {
    padding: SPACING.XL,
  },
  headerTitle: {
    fontSize: FONT_SIZE.XL,
    fontWeight: '600',
  },
  headerDescription: {
    marginTop: SPACING.LG,
    fontSize: FONT_SIZE.MD,
    lineHeight: 25,
  },
  container: {
    padding: SPACING.LG,
    gap: SPACING.MD,
  },
  statsContainer: {
    gap: SPACING.LG,
  },
  statText: {
    fontSize: FONT_SIZE.LG,
  },
  loanTypesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: SPACING.LG,
    paddingTop: SPACING.MD,
  },
  loanTypeItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.LG,
    width: '100%',
  },
  radioButton: {
    borderRadius: 100,
    borderWidth: 2,
    width: 20,
    height: 20,
  },
  loanTypeText: {
    fontSize: FONT_SIZE.MD,
  },
});
