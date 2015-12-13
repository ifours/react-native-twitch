'use strict';

const BASE_URL = 'https://api.twitch.tv/kraken';

class Kraken {
  constructor() {
    this._urls = {};
    this.accept = 'application/vnd.twitchtv.v3+json';

    this._urls.games = `${BASE_URL}/games/top`;
    this._urls.streams = `${BASE_URL}/streams`;
  }

  async getGames() {
    let response = await fetch(this._urls.games);
    let body = await response.json();

    return body;
  }

  async getStreams(game) {
    let response = await fetch(`${this._urls.streams}?game=${encodeURIComponent(game)}&limit=15`);
    let body = await response.json();

    return body;
  }
}

export default new Kraken();
