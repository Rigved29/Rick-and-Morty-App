import React, { createContext, useState } from 'react';

//context for the app, mainly using for filterType and filterValue, Since they are being used in many components.

type contextType = {
    filterType: string;
    filterValue: any;
    updateFilterType: (val: string) => void;
    updateFilterValue: (val: any) => void;
};

const defaultValues: contextType = {
    filterType: '',
    filterValue: '',
    updateFilterType: (val: String) => { },
    updateFilterValue: (val: any) => { }
};

export const dataContext = createContext<contextType>(defaultValues);



type Props = {
    children: React.ReactNode;
};

export function DataProvider({ children }: Props) {
    const [filterType, setFilterType] = useState<string>('');
    const [filterValue, setFilterValue] = useState<any>('');

    const updateFilterType = (val: string): void => {
        setFilterType(val);
    };

    const updateFilterValue = (val: any): void => {
        setFilterValue(val);
    };

    const value = {
        filterType,
        filterValue,
        updateFilterType,
        updateFilterValue
    };

    return (
        <>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </>
    );
}
