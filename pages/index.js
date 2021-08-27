import Head from 'next/head';

import Container from '../components/container';
import JoinModal from '../components/joinModal';
import makeTitle from '../lib/makeTitle';
import { classes } from '../lib/util';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>{makeTitle('')}</title>
      </Head>
      <Container className='flex flex-col items-center justify-center'>
        <h1
          className={(classes(styles.Logo), 'mb-5 text-5xl text-white text-center mt-10 ')}
          style={{
            fontFamily: 'Cinzel Decorative',
          }}
        >
          LOTR: The Confrontation
        </h1>
        <JoinModal />
      </Container>
    </>
  );
}
