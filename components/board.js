import Card from './card';

const boardRows = [
  ['mordor.jpg'],
  ['dagorlad.jpg', 'gondor.jpg'],
  ['mirkwood.jpg', 'fangorn.jpg', 'rohan.jpg'],
  ['highpass.jpg', 'misty.jpg', 'moria.jpg', 'gap of rohan.jpg'],
  ['rhudaur.jpg', 'eregion.jpg', 'enedwaith.jpg'],
  ['arthedain.jpg', 'cardolan.jpg'],
  ['shire.jpg'],
];

const height = ['16%', '14%', '14%', '12.5%', '14%', '14%', '16%'];

export default function Board(props) {
  const { cards, clientID, game, addEvent, isSpectator } = props;
  const size = '50';
  const dims = { width: `${size}rem`, height: `${size}rem` };
  return (
    <div
      className='relative mr-4 overflow-hidden bg-black rounded data-board'
      style={{
        ...dims,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/background3.jpg)',
      }}
    >
      {cards.map((e) => {
        const position = e.position
          .split('-')[1]
          .split(',')
          .map((e) => parseFloat(e));
        const flipped = isSpectator ? game.playerSides[e.playerID] === 'sauron' : e.playerID !== clientID;
        const verticalAnchor = flipped ? 'bottom' : 'top';
        const horizontalAnchor = flipped ? 'right' : 'left';
        return (
          <Card
            outerStyle={{
              [horizontalAnchor]: `${position[0] * 100}%`,
              [verticalAnchor]: `${position[1] * 100}%`,
              position: 'absolute',
              zIndex: '10000',
            }}
            key={e.id}
            card={e}
            addEvent={addEvent}
            clientID={clientID}
            isSpectator={isSpectator}
            onTheBoard={true}
          />
        );
      })}
      <div
        className='overflow-hidden'
        style={{
          width: `${(size ** 2 / 2) ** 0.5}rem`,
          height: `${(size ** 2 / 2) ** 0.5}rem`,
          background: '#000',
          transform: `translate(-50%, -50%) rotate(45deg) ${game.playerSides[clientID] === 'sauron' ? 'rotate(180deg)' : ''}`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundSize: '110%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(/board.jpg)',
        }}
      ></div>
    </div>
  );
}
