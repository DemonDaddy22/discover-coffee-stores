import React from 'react';
import styles from '@/styles/button.module.css';

interface IButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: React.FC<IButtonProps> = ({ children, className, ...restProps }) => {
  return (
    <button className={`${styles.button} ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
