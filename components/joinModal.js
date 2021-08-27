import {
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import {
  checkPinExists,
  classes,
} from '../lib/util';
import Banner from './banner';

export default function JoinModal() {
  const tabs = ['Join', 'Watch', 'Create'];
  const [tab, setTab] = useState(tabs[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  return (
    <>
      <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full'>
        <div className='flex'>
          {tabs.map((e) => {
            return (
              <button
                className={classes(
                  'flex-1',
                  'py-4',
                  'text-center',
                  'border-b-2',
                  tab === e ? 'border-blue-600' : 'border-gray-100',
                  'cursor-pointer'
                )}
                key={e}
                onClick={() => setTab(e)}
              >
                <h3 className={classes('text-2xl', 'leading-6', tab === e ? 'text-blue-600' : 'text-gray-900')}>{e}</h3>
              </button>
            );
          })}
        </div>
        <div className='w-full px-4 pt-5 pb-4 sm:p-6'>
          <div>
            <div className='text-center'>
              <p as='h3' className='text-2xl font-medium leading-6 text-gray-900'>
                {tab} a Game
              </p>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  {tab === 'Join' ? 'Join a game as a second participant.' : ''}
                  {tab === 'Create' ? 'Create a new game with a random game pin.' : ''}
                  {tab === 'Watch' ? 'Spectate an ongoing game.' : ''}
                </p>
              </div>
            </div>
          </div>
          {tab !== 'Create' ? (
            <div>
              <input
                type='text'
                name='pin'
                id='pin'
                className='block w-full px-4 py-2 mt-5 text-base border border-gray-200 rounded-md shadow-sm outline-none focus:ring-blue-500 focus:border-blue-500'
                placeholder='Enter The Game Pin'
                spellCheck={false}
                ref={ref}
              />
            </div>
          ) : null}
          <div className='mt-3'>
            <button
              type='button'
              className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              onClick={async () => {
                let pinToGoTo;
                if (tab === 'Create') {
                  const gen = () => Math.floor(Math.random() * 9000) + 1000;
                  let chosenPin = gen();
                  while (await checkPinExists(chosenPin)) chosenPin = gen();
                  await firebase
                    .database()
                    .ref(chosenPin)
                    .set([
                      {
                        type: 'game-created',
                      },
                    ]);
                  pinToGoTo = chosenPin;
                } else {
                  pinToGoTo = ref.current.value;
                }
                if (await checkPinExists(pinToGoTo)) {
                  router.push({
                    pathname: '/' + pinToGoTo,
                  });
                } else {
                  setOpen(true);
                }
              }}
            >
              {tab} Game
            </button>
          </div>
        </div>
      </div>
      {open ? <Banner text={'Invalid game pin.'} setOpen={setOpen}></Banner> : null}
    </>
  );
}
