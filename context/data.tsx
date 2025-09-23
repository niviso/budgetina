import React, { useState, useContext, useEffect } from "react";
import { getTimestamp, setItem, getItem } from "../helpers/helpers";
import { Expence, RecurringExpence, Loan } from "../types";

interface DataState {
    expences: Expence[];
    recurringExpences: RecurringExpence[];
    loans: Loan[];
    categories: string[];
    budget: number;
    budgetHistory: number[];
}

interface DataContextType {
    state: DataState;
    setState: React.Dispatch<React.SetStateAction<DataState>>;
    newExpence: (message: string, amount: number, categories: string[]) => void;
    newRecurringExpence: (message: string, amount: number, categories: string[]) => void;
    newLoan: (loan: { total: number; intrest: number; amortization: number; name: string, created: string, paymentDate: number }) => void;
    deleteItem: (type: "expence" | "loan" | "recurringExpence", id: number) => void;
    addCategory: (category: string) => void; // New function
}

const DataContext = React.createContext<DataContextType>({} as DataContextType);

interface DataProviderProps {
    children: React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [state, setState] = useState<DataState>({
        budget: 0,
        budgetHistory: [],
        expences: [],
        loans: [],
        categories: [],
        recurringExpences: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getItem("data");
            if (result) {
                if (!result.categories.includes("Loans")) {
                    result.categories.push("Loans");
                }
                setState(result);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        saveState();
    }, [state]);

    const saveState = () => {
        setItem("data", JSON.stringify(state));
    };

    const deleteItem = (type: "expence" | "loan" | "recurringExpence", id: number) => {
        switch (type) {
            case "expence":
                setState({
                    ...state,
                    expences: state.expences.filter((expence: Expence) => expence.id != id)
                });
                break;
            case "loan":
                setState({
                    ...state,
                    loans: state.loans.filter((loan: Loan) => loan.id != id)
                });
                break;
            case "recurringExpence":
                setState({
                    ...state,
                    recurringExpences: state.recurringExpences.filter((recurringExpence: RecurringExpence) => recurringExpence.id != id)
                });
                break;
        }
        saveState();
    };

    const newExpence = (message: string, amount: number, categories: string[]) => {
        setState({
            ...state,
            expences: [
                {
                    id: Math.floor(Math.random() * 9_000_000) + 1_000_000,
                    message,
                    amount,
                    category: categories,
                    created: getTimestamp()
                },
                ...state.expences
            ]
        });
    };

    const newRecurringExpence = (message: string, amount: number, categories: string[]) => {
        setState({
            ...state,
            recurringExpences: [
                {
                    id: Math.floor(Math.random() * 9_000_000) + 1_000_000,
                    message,
                    amount,
                    category: categories,
                    created: getTimestamp(),
                    active: true,
                    deploy: 'monthly',
                    deployDate: ''
                },
                ...state.recurringExpences
            ]
        });
    };

    const newLoan = ({ total, intrest, amortization, name, created, paymentDate }: { total: number; intrest: number; amortization: number; name: string, created: string, paymentDate: number }) => {
        setState({
            ...state,
            loans: [
                {
                    id: Math.floor(Math.random() * 9_000_000) + 1_000_000,
                    created: created,
                    total,
                    intrest,
                    amortization,
                    intrestHistory: [intrest],
                    name,
                    paymentDate: paymentDate
                },
                ...state.loans
            ]
        });
    };

    const addCategory = (category: string) => {
        if (!state.categories.includes(category)) {
            setState({
                ...state,
                categories: [...state.categories, category]
            });
        }
    };

    return (
        <DataContext.Provider value={{ state, setState, newExpence, newRecurringExpence, newLoan, deleteItem, addCategory }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
export { DataContext, DataProvider };
