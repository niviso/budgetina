import AsyncStorage from '@react-native-async-storage/async-storage';

export function toLocalCurrency(num: number): string {
  let fixedNum = Math.round(num);
  const parsedNum = new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK", maximumSignificantDigits: 10 }).format(
    fixedNum
  );

  return parsedNum
}


export async function getItem(key: string) {
  const data: string | null = await AsyncStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null
  }
}

export function getTimestamp(): string {
  let today = new Date()
  const offset = today.getTimezoneOffset()
  today = new Date(today.getTime() - (offset * 60 * 1000))
  return today.toISOString();
}

export async function setItem(key: string, data: string) {
  await AsyncStorage.setItem(key, data);
}

export function formatCurrency(number: string): string {
    const no = number.toString().replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return no;
  };
