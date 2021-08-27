import {
  useEffect,
  useState,
} from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Board from '../components/board';
import CardBox from '../components/cardBox';
import Container from '../components/container';
import SelectCards from '../components/selectCards';
import Game from '../game/Game';
import makeTitle from '../lib/makeTitle';
import {
  checkPinExists,
  classes,
} from '../lib/util';

const asArray = (e) => (e ? Object.values(e) : []);

const GamePage = () => {
  const router = useRouter();
  const { pin } = router.query;
  const [game, setGame] = useState(null);
  const [clientID, setClientID] = useState('');
  const isSpectator = game && !game.players.includes(clientID);
  const addEvent = (evt) => {
    return new Promise((resolve) => {
      const db = firebase.database();
      const { pin } = router.query;
      if (pin === undefined) return;
      db.ref(pin)
        .once('value')
        .then(function (snapshot) {
          const data = asArray(snapshot.val());
          data.push(evt);
          db.ref(pin).set(data);
          resolve();
        });
    });
  };
  useEffect(() => {
    (async () => {
      const db = firebase.database();
      const { pin } = router.query;
      if (pin === undefined) return;
      if (!(await checkPinExists(pin))) {
        window.open('/', '_self');
      }
      const clientID = localStorage.getItem('lotr-client-id');
      setClientID(clientID);
      db.ref(pin).on('value', (snapshot) => {
        const data = asArray(snapshot.val());
        const newGame = new Game(data);
        setGame(newGame);
      });
    })();
  }, [router.query]);

  if (!game) {
    return (
      <Container className='flex items-center justify-center'>
        <h1 className='px-8 py-4 text-2xl text-blue-600 bg-white rounded-md shadow-xl'>Loading...</h1>
      </Container>
    );
  }

  if (game.players.length < 2 && !game.players.includes(clientID)) {
    addEvent({
      type: 'player-joined',
      clientID,
    });
  }

  let state = 'playing';
  if (!isSpectator) {
    if (!game.playerSides[clientID]) {
      state = 'select-side';
      let selectedSide = 'fellowship';
      if (Object.values(game.playerSides).includes('fellowship')) selectedSide = 'sauron';
      addEvent({
        type: 'player-side-chosen',
        clientID,
        side: selectedSide,
      });
    } else if (game.getCards().filter((e) => e.playerID === clientID).length === 0) {
      state = 'select-cards';
    }
  }

  return (
    <Container>
      <Head>
        <title>{makeTitle(`Game ${pin || ''}`)}</title>
      </Head>
      <div className='flex flex-col game'>
        <div className='nav'>
          <p onClick={() => window.open('/', '_self')}>&larr;&nbsp; Back To Home</p>
          <div className='center'>
            <h1>LOTR: The Confrontation</h1>
          </div>
          <p>
            Game Pin: {pin || ''}
            <br />
            <Link href='/resources.pdf'>
              <a target='_blank'>Game Resources</a>
            </Link>
          </p>
        </div>
        {state === 'select-cards' ? (
          <SelectCards
            side={game.playerSides[clientID]}
            continue={async (cards) => {
              for (const e of cards) {
                await addEvent({
                  type: 'add-card',
                  cardID: e,
                  image: e,
                  playerID: clientID,
                });
              }
            }}
          />
        ) : null}
        <div className='flex w-full p-5 row'>
          <div className='flex-1 board'>
            <Board
              game={game}
              clientID={clientID}
              addEvent={addEvent}
              cards={game.getCards().filter((e) => e.position.startsWith('board'))}
              isSpectator={isSpectator}
            />
          </div>
          <div className='flex-1 cards' style={{ height: '49rem' }}>
            {[...game.players.filter((e) => e !== clientID), ...(isSpectator ? [] : [clientID])].map((playerID, idx) => {
              return (
                <CardBox
                  side={game.playerSides[playerID]}
                  key={idx}
                  className={classes(idx > 0 ? 'mt-4' : '', isSpectator ? 'h-1/2' : idx === 0 ? 'h-1/3' : 'h-2/3', 'overflow-y-auto')}
                  addEvent={addEvent}
                  cards={game.getCards().filter((e) => e.playerID === playerID)}
                  clientID={clientID}
                  isSpectator={isSpectator}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GamePage;
