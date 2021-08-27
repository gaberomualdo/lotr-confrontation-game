import { useState } from 'react';

import { classes } from '../lib/util';

const defaultCards = {
  sauron: [
    '1_B.jpg.gif',
    '2_B.jpg.gif',
    '3_B.jpg.gif',
    '4_B.jpg.gif',
    '5_B.jpg.gif',
    '6_B.jpg.gif',
    'Magic_B.jpg.gif',
    'Retreat_B.jpg.gif',
    'The_Eye_Of_Sauron.jpg.gif',
    'DS_crebain.jpg',
    'DS_dark_mordor.jpg',
    'DS_palantir.jpg',
    'DS_recall.jpg',
  ],
  fellowship: [
    '1_W.jpg.gif',
    '2_W.jpg.gif',
    '3_W.jpg.gif',
    '4_W.jpg.gif',
    '5_W.jpg.gif',
    'Magic_W.jpg.gif',
    'Elven_Cloak.jpg.gif',
    'Noble_Sacrifice.jpg.gif',
    'Retreat_W.jpg.gif',
    'LS_gandalf_the_white.jpg',
    'LS_gwaihir.jpg',
    'LS_king_revealed.jpg',
    'LS_shadowfax.jpg',
  ],
};
const options = {
  sauron: [
    ['DC_orcs.jpg', 'DD_orcs.png'],
    ['DC_sheblob.jpg', 'DD_wormtongue.png'],
    ['DC_saruman.jpg', 'DD_saruman.png'],
    ['DC_flying_nazgul.jpg', 'DD_fliying_nazgul.png'],
    ['DC_balrog.jpg', 'DD_uruk-hai.png'],
    ['DC_warg.jpg', 'DD_gollum.png'],
    ['DC_dark_rider.jpg', 'DD_mouth_sauron.png'],
    ['DC_witch_king.jpg', 'DD_witch_king.png'],
    ['DC_cave_troll.jpg', 'DD_watcher.png'],
  ],
  fellowship: [
    ['LC_frodo.jpg', 'LD_frodo.png'],
    ['LC_pippin.jpg', 'LD_smeagol.png'],
    ['LC_gandalf.jpg', 'LD_gandalf.png'],
    ['LC_sam.jpg', 'LD_sam.png'],
    ['LC_legolas.jpg', 'LD_elrond.png'],
    ['LC_aragorn.jpg', 'LD_aragorn.png'],
    ['LC_gimli.jpg', 'LD_theoden.png'],
    ['LC_merry.jpg', 'LD_faramir.png'],
    ['LC_boromir.jpg', 'LD_treebeard.png'],
  ],
};
const getArrWithChange = (arr, idx, val) => {
  const newArr = [...arr];
  newArr[idx] = val;
  return newArr;
};
export default function SelectCards(props) {
  const { side } = props;
  const cards = options[side];
  const [selected, setSelected] = useState(new Array(cards.length).fill(0));
  return (
    <div
      className='px-8 py-6 bg-white rounded-md shadow-lg select-cards'
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        width: '500px',
        maxWidth: '95%',
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
    >
      <h1 className='mb-8 text-2xl font-medium text-center'>Select Your Cards</h1>
      {cards.map((twoCards, index) => {
        return (
          <div className='flex mb-8 row' key={index}>
            {twoCards.map((card, idx) => (
              <div
                className={classes(
                  'flex',
                  'items-center',
                  'flex-1',
                  'rounded',
                  'cursor-pointer',
                  idx === 0 ? 'mr-8' : '',
                  selected[index] === idx ? 'opacity-100 ring-4 ring-offset-4 ring-gray-800' : 'opacity-50'
                )}
                onClick={() => setSelected(getArrWithChange(selected, index, idx))}
                key={idx}
              >
                <img alt='Card' style={{ width: '100%', height: 'auto' }} src={'/' + card} />
              </div>
            ))}
          </div>
        );
      })}
      <button
        type='button'
        className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        onClick={() => props.continue([...defaultCards[side], ...cards.map((e, i) => e[selected[i]])].map((e) => '/' + e))}
      >
        Continue To Game
      </button>
    </div>
  );
}
