'use client';
import Banner from '@/components/Banner';
import styles from './page.module.css';
import Image from 'next/image';
import Card from '@/components/Card';
import { motion, Variants } from 'framer-motion';
import data from '../coffee-stores.json';

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.5, staggerChildren: 0.075 } },
};

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Banner buttonText='View nearby shops' onButtonClick={() => {}} />
        <div className={styles.hero}>
          <Image src='/static/hero-image.png' alt='coffee hero image' width={800} height={400} priority />
        </div>
        <motion.section
          className={styles.cardsContainer}
          variants={cardsContainerVariants}
          initial='hidden'
          animate='visible'
        >
          {data.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              imgUrl={item.imgUrl}
              url={`/coffee-store/${item.name.toLowerCase().split(/\w+/).join('-')}`}
            />
          ))}
        </motion.section>
      </main>
    </div>
  );
}
