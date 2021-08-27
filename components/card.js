import {
  Component,
  createRef,
} from 'react';

import { classes } from '../lib/util';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: false, startPosition: [0, 0], startClickPosition: [0, 0], positionChange: [0, 0], dragging: false };
    this.ref = createRef();
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('mousemove', this.mouseMove);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);
  }
  mouseUp() {
    if (!this.state.dragging) return;
    setTimeout(() => {
      this.setState({ dragging: false });
    }, 0);
    const boardElm = document.querySelector('.data-board');
    if (!boardElm) return;
    const rect = boardElm.getBoundingClientRect();
    const position = [this.state.startPosition[0] + this.state.positionChange[0], this.state.startPosition[1] + this.state.positionChange[1]];
    const positionInBoard = [position[0] - rect.left, position[1] - rect.top];
    if (!(positionInBoard[0] < 0 || positionInBoard[0] > rect.width || positionInBoard[1] < 0 || positionInBoard[1] > rect.height)) {
      const percentInBoard = [positionInBoard[0] / rect.width, positionInBoard[1] / rect.height];
      this.props.addEvent({
        type: 'move-card',
        cardID: this.props.card.id,
        position: `board-${percentInBoard[0]},${percentInBoard[1]}`,
      });
    }
  }
  mouseMove(e) {
    if (this.state.dragging) {
      this.setState({ positionChange: [e.clientX - this.state.startClickPosition[0], e.clientY - this.state.startClickPosition[1]] });
    }
  }
  render() {
    const { props } = this;
    const { card, onTheBoard, isSpectator, clientID, addEvent } = props;
    const { selected } = this.state;
    const setSelected = (val) => this.setState({ selected: val });
    const disabled = card.playerID !== clientID;
    let useMaskedImage = false;
    if (!isSpectator && card.masked && disabled) {
      if (card.position.startsWith('board')) {
        useMaskedImage = true;
      } else {
        return <></>;
      }
    }
    const disabledProps = disabled ? { disabled: true } : {};

    const dimsClasses = [onTheBoard ? 'h-12' : 'h-40', onTheBoard ? 'w-24' : 'w-28'];

    return (
      <div className={classes(...dimsClasses, 'relative', 'inline-block', props.className)} style={props.outerStyle}>
        <button
          ref={this.ref}
          onMouseDown={(e) => {
            if (this.state.dragging) return;
            this.setState({
              dragging: true,
              startPosition: [this.ref.current.getBoundingClientRect().left, this.ref.current.getBoundingClientRect().top],
              startClickPosition: [e.clientX, e.clientY],
              positionChange: [0, 0],
            });
          }}
          className={classes(
            ...dimsClasses,
            disabled ? 'cursor-default' : selected ? 'cursor-move' : 'cursor-pointer',
            !onTheBoard || !selected ? 'overflow-hidden' : '',
            'bg-black',
            'absolute',
            'left-0',
            'top-0',
            'rounded-md',
            'block',
            selected && card.masked ? 'ring-4 ring-offset-0 ring-blue-500' : '',
            (!disabled || isSpectator) && !card.masked ? 'ring-4 ring-offset-0 ring-yellow-500' : ''
          )}
          style={{
            ...props.style,
            ...(this.state.dragging
              ? {
                  position: 'fixed',
                  left: `${this.state.startPosition[0]}px`,
                  top: `${this.state.startPosition[1]}px`,
                  transform: `translate(${this.state.positionChange[0]}px, ${this.state.positionChange[1]}px)`,
                  zIndex: 1000,
                }
              : {
                  transition: 'box-shadow .15s',
                }),
          }}
          onFocus={() => setSelected(true)}
          onBlur={() => setSelected(false)}
          {...disabledProps}
        >
          <img
            src={useMaskedImage ? '/mask.png' : card.image}
            alt=''
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
            draggable='false'
            className='rounded-md'
          />
          <div
            className='flex w-full overflow-hidden transition-all'
            style={{
              position: 'absolute',
              bottom: selected && !onTheBoard ? 0 : '-2.75rem',
              borderRadius: selected && onTheBoard ? '6px' : '0',
              opacity: onTheBoard ? (selected ? 1 : 0) : 1,
              left: 0,
              height: '2.5rem',
            }}
          >
            {[
              {
                icon:
                  card.position === 'pile' ? (
                    <svg style={{ fill: '#fff' }} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <path d='M2 9l-1-7h5.694c1.265 1.583 1.327 2 3.306 2h13l-1 5h-4.193l-3.9-3-1.464 1.903 1.428 1.097h-1.971l-3.9-3-2.307 3h-3.693zm-2 2l2 11h20l2-11h-24z' />
                    </svg>
                  ) : (
                    <svg style={{ fill: '#fff' }} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <path d='M7.972 2h-6.972l.714 5h2.021l-.429-3h3.694c1.112 1.388 1.952 2 4.277 2h9.283l-.2 1h2.04l.6-3h-11.723c-1.978 0-2.041-.417-3.305-2zm16.028 7h-24l2 13h20l2-13z' />
                    </svg>
                  ),
                onClick: () =>
                  addEvent({
                    type: 'move-card',
                    cardID: card.id,
                    position: card.position === 'pile' ? 'unused-pile' : 'pile',
                  }),
              },
              {
                icon: (
                  <svg style={{ fill: '#fff' }} xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path d='M5 18c4.667 4.667 12 1.833 12-4.042h-3l5-6 5 6h-3c-1.125 7.98-11.594 11.104-16 4.042zm14-11.984c-4.667-4.667-12-1.834-12 4.041h3l-5 6-5-6h3c1.125-7.979 11.594-11.104 16-4.041z' />
                  </svg>
                ),
                onClick: () =>
                  addEvent({
                    type: 'change-card-masked-state',
                    cardID: card.id,
                    maskedState: !card.masked,
                  }),
              },
            ].map((e, i) => (
              <button
                key={i}
                onClick={e.onClick}
                className={classes(
                  'bg-blue-500',
                  'hover:bg-blue-600',
                  'transition-all',
                  'cursor-pointer',
                  'flex',
                  'justify-center',
                  'items-center',
                  'flex-1',
                  'h-full'
                )}
              >
                {e.icon}
              </button>
            ))}
          </div>
        </button>
      </div>
    );
  }
}
