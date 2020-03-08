import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlistImg: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    // playlistImg: 'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba',
    play: false,
    playListName: 'Liked Songs',
    liked: false,
    numberOfLikedSongs: '95',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
    ],
  },
  mutations: {
    changePlay() {
      this.state.play = !this.state.play;
    },

    changeLiked() {
      this.state.liked = !this.state.liked;
    },
  },
  actions: {
  },
  modules: {
  },
});
