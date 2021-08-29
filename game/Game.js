export default class Game {
  players = [];
  spectators = [];
  playerSides = {};
  cards = {};
  constructor(events) {
    events.forEach((e) => {
      switch (e.type) {
        case 'player-joined':
          this.players.push(e.clientID);
          break;
        case 'player-side-chosen':
          this.playerSides[e.clientID] = e.side;
          break;
        case 'add-card':
          this.cards[e.cardID] = {
            image: e.image,
            playerID: e.playerID,
            masked: true,
            position: 'pile',
          };
          break;
        case 'move-card':
          this.cards[e.cardID].position = e.position;
          break;
        case 'change-card-masked-state':
          this.cards[e.cardID].masked = e.maskedState;
          break;
      }
    });
  }
  getCards() {
    return Object.keys(this.cards).map((e) => ({ ...this.cards[e], id: e }));
  }
}
