'use client';
import Banner from '@/components/Banner';
import styles from './page.module.css';
import Card from '@/components/Card';
import { motion, Variants } from 'framer-motion';
import coffeeStoresData from '../coffee-stores.json';
import { getIdFromName } from '@/utils';

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
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner buttonText='View nearby shops' onButtonClick={() => {}} />
        {!!coffeeStoresData.length && (
          <motion.section variants={coffeeStoreVariants} initial='hidden' animate='visible'>
            <motion.h2 variants={headerVariants} className={styles.cardsHeading}>
              Nearby Stores
            </motion.h2>
            <motion.div variants={cardsVariants} className={styles.cardsContainer}>
              {coffeeStoresData.map(item => (
                <Card
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  imgUrl={item.imgUrl}
                  url={`/coffee-store/${getIdFromName(item.name)}`}
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
