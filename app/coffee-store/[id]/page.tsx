'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Variants, motion } from 'framer-motion';
import coffeeStoresData from '../../../coffee-stores.json';
import { getIdFromName } from '@/utils';
import styles from '@/styles/store.module.css';

export interface ICoffeeStore {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
  description: string;
}

interface Params {
  params: {
    id: string;
  };
}

interface Props extends IProps, Params {}

const getCoffeeStore = (id: string): Partial<ICoffeeStore> =>
  coffeeStoresData.find(store => getIdFromName(store.name) === id) ?? {};

const storeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.25, staggerChildren: 0.25 } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentContainerVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.5, delayChildren: 0.25, staggerChildren: 0.1, when: 'beforeChildren' },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const CoffeeStore: React.FC<Props> = ({ params }) => {
  const { name, address, imgUrl, description, websiteUrl } = getCoffeeStore(params.id);

  return (
    <motion.main variants={storeVariants} initial='hidden' animate='visible' className={styles.store}>
      <Link href='/' className={styles.backButton}>
        {'<'} Go to home
      </Link>
      <section className={styles.container}>
        <motion.div variants={imageVariants} className={styles.imageContainer}>
          <Image
            src={imgUrl ?? ''}
            height={300}
            width={400}
            alt={name ?? ''}
            className={styles.image}
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        </motion.div>
        <motion.div variants={contentContainerVariants} className={styles.content}>
          <motion.h1 variants={contentVariants} className={styles.name}>
            <Link href={websiteUrl ?? ''} target='__blank'>
              {name}
            </Link>
          </motion.h1>
          <motion.p variants={contentVariants} className={styles.address}>
            {address} | <span className={styles.ratings}>4</span>
            <button onClick={() => {}} className={styles.ratingsButton}>
              <Image
                src='/static/icons/heart.svg'
                alt='ratings'
                height={16}
                width={16}
                unoptimized={process.env.NODE_ENV === 'development'}
              />
            </button>
          </motion.p>
          <motion.p variants={contentVariants} className={styles.description}>
            {description}
          </motion.p>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default CoffeeStore;
