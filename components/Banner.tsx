import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/banner.module.css';
import Button from './UI/Button';

interface IBannerProps extends IProps {
  buttonText: string;
  onButtonClick: () => void;
}

const bannerVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, staggerChildren: 0.1 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const Banner: React.FC<IBannerProps> = ({ buttonText, onButtonClick }) => {
  return (
    <motion.section variants={bannerVariants} initial='hidden' animate='visible' className={styles.container}>
      <motion.div variants={contentVariants}>
        <h1 className={styles.title}>
          <span className={styles.title1}>Coffee</span> Connoisseur
        </h1>
        <p className={styles.subtitle}>Discover your local coffee shops!</p>
      </motion.div>
      <motion.div variants={contentVariants}>
        <Button className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default Banner;
