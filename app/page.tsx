'use client';
import Banner from '@/components/Banner';
import styles from './page.module.css';
import Card from '@/components/Card';
import { motion, Variants } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';
import { CoffeeStoresContext } from '@/context/CoffeeStoresContext';
import useLocation from '@/hooks/useLocation';

const coffeeStoreVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.5, staggerChildren: 0.1 } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const cardsVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.075 } },
};

const Home = () => {
  const { location, locationError, locationLoading, handleTrackLocation } = useLocation();

  const { coffeeStores, fetchCoffeeStores } = useContext(CoffeeStoresContext);

  const [page, setPage] = useState(1);

  const handleButtonClick = useCallback(() => {
    handleTrackLocation();
    setPage((prevPage) => prevPage + 1);
  }, [handleTrackLocation]);

  useEffect(() => {
    if (location) {
      fetchCoffeeStores(location, page);
    }
  }, [fetchCoffeeStores, location, page]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner
          buttonText={locationLoading ? 'Locating...' : 'View more nearby shops'}
          onButtonClick={locationLoading ? () => {} : handleButtonClick}
          locationError={locationError}
        />
        {!!coffeeStores.length && (
          <motion.section variants={coffeeStoreVariants} initial='hidden' animate='visible'>
            <motion.h2 variants={headerVariants} className={styles.cardsHeading}>
              Nearby Stores
            </motion.h2>
            <motion.div variants={cardsVariants} className={styles.cardsContainer}>
              {coffeeStores.map(item => (
                <Card
                  key={item.fsq_id}
                  name={item.name ?? ''}
                  description={item.description ?? ''}
                  imgUrl={item.images?.small ?? ''}
                  url={`/coffee-store/${item.fsq_id}`}
                />
              ))}
            </motion.div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default Home;
