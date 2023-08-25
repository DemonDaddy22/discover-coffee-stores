import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/styles/card.module.css';

interface Props {
  name: string;
  description: string;
  imgUrl: string;
  url: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const descriptionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
};

const Card: React.FC<Props> = ({ name, description, imgUrl, url }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href={url} className={styles.cardWrapper}>
      <motion.section
        className={styles.card}
        variants={cardVariants}
        whileHover={{ boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.25)', transition: { delay: 0 } }}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <Image
          src={imgUrl}
          alt={name}
          className={styles.image}
          width={500}
          height={300}
          unoptimized={process.env.NODE_ENV === 'development'}
        />
        <div className={styles.content}>
          <h2 className={styles.name}>{name}</h2>
          <motion.p
            className={styles.description}
            variants={descriptionVariants}
            initial={false}
            animate={isHovering ? 'visible' : 'hidden'}
          >
            {description}
          </motion.p>
        </div>
      </motion.section>
    </Link>
  );
};

export default Card;
