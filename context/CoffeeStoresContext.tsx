'use client';
import React, { useCallback, useEffect, useState } from 'react';

interface ICoffeeStoresContext {
  coffeeStores: Array<Partial<ICoffeeStore>>;
  error: any;
  fetchCoffeeStores: (location: string, page: number) => void;
}

const CoffeeStoresContextValue: ICoffeeStoresContext = {
  coffeeStores: [],
  error: null,
  fetchCoffeeStores: () => {},
};

export const CoffeeStoresContext = React.createContext(CoffeeStoresContextValue);

const CoffeeStoresContextProvider: React.FC<IPropsWithChildren> = ({ children }) => {
  const [coffeeStores, setCoffeeStores] = useState<Array<Partial<ICoffeeStore>>>([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState<any>(null);


  const fetchCoffeeStores = useCallback(
    async (location = '12.979169,77.640700', page = 1) => {
      try {
        const storesResponse = await fetch(`/api/coffee-stores?location=${location}&page=${page}`);
        const { results } = await storesResponse.json() ?? [];
        setCoffeeStores(prevStores => [...prevStores, ...results]);
        setCoffeeStoresError(null);
      } catch (err) {
        setCoffeeStoresError(err);
      }
    },
    []
  );

  useEffect(() => {
    fetchCoffeeStores();
  }, [fetchCoffeeStores]);

  return (
    <CoffeeStoresContext.Provider value={{ coffeeStores, error: coffeeStoresError, fetchCoffeeStores }}>
      {children}
    </CoffeeStoresContext.Provider>
  );
};

export default CoffeeStoresContextProvider;
