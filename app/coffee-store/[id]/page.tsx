import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Params {
  params: {
    id: string;
  };
}

interface Props extends IProps, Params {}

const CoffeeStore: React.FC<Props> = ({ params }) => {
  return (
    <>
      <Head>
        <title>Coffee Store</title>
      </Head>
      <h1>Coffee Store Page {params.id}</h1>
      <Link href='/'>Go to home</Link>
    </>
  );
};

export default CoffeeStore;
