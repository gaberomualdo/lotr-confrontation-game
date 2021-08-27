import { useState } from 'react';

import { classes } from '../lib/util';
import Card from './card';

export default function CardsBox(props) {
  const { clientID, cards, side, addEvent, isSpectator } = props;
  const tabs = ['Cards', 'Unused'];
  const [tab, setTab] = useState(tabs[0]);
  return (
    <div
      className={'text-center flex-1 w-full rounded p-4 pt-0 ' + props.className}
      style={{
        backgroundColor: 'rgba(0,0,0,.5)',
      }}
    >
      <div className='mt-2 mb-2 tabs'>
        {tabs.map((e) => (
          <button
            className={classes(
              'flex-1',
              'py-1',
              'px-4',
              'text-center',
              'border-b-2',
              tab === e ? 'border-white' : 'border-transparent',
              'cursor-pointer',
              'transition-all'
            )}
            key={e}
            onClick={() => setTab(e)}
          >
            <p className={classes('text-base', 'capitalize', 'leading-6', tab === e ? 'opacity-100' : 'opacity-70', 'text-white')}>
              {side} {e}
            </p>
          </button>
        ))}
      </div>
      {(tabs.indexOf(tab) === 0 ? cards.filter((e) => e.position === 'pile') : cards.filter((e) => e.position === 'unused-pile')).map(
        (card, index) => (
          <Card className='mt-2 mr-4' key={index} card={card} addEvent={addEvent} clientID={clientID} isSpectator={isSpectator} />
        )
      )}
    </div>
  );
}
