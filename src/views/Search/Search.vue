<template>
  <v-container fluid="">
    <div v-if="RecentExist">
      <h2 class="white--text mt-10 font-weight-bold RECENT"
      id="history"
      @click="History()">Recent searches</h2>
    <v-row>
        <v-col  xs="12" sm="6" md="3" lg="2"
        v-for="( s , i ) in RecentLength" :key="RecentSearch[i].id">
         <song-card v-if="RecentSearch[i].type != 'artist'"
          :id="RecentSearch[i].id"
          :name="RecentSearch[i].name"
          :description="RecentSearch[i].description"
          :images="RecentSearch[i].images"
          :type="RecentSearch[i].type"
          :collaborative="RecentSearch[i].collaborative"
          :external_urls="RecentSearch[i].external_urls"
          :href="RecentSearch[i].href"
          :public="RecentSearch[i].public"
          :snapshot_id="RecentSearch[i].snapshot_id"
          :uri="RecentSearch[i].uri"></song-card>
         <artist-card v-if="RecentSearch[i].type == 'artist'"
          :id="RecentSearch[i].id"
          :profileName="RecentSearch[i].name"
          :images="RecentSearch[i].images"
          :type="RecentSearch[i].type"
          :href="RecentSearch[i].href"
        ></artist-card>
         </v-col>
    </v-row>
    </div>
    <div v-if="PGenresExist">
    <h2 class="white--text mt-10 font-weight-bold">Prefered Genres</h2>
    <v-row>
        <v-col  xs="12" sm="12" md="12" lg="4"
        v-for="PGenre in PGenres" :key="PGenre._id">
          <pref
            class="mt-3"
            :source="PGenre.icons[0].url"
            :title="PGenre.name"
            :route="PGenre._id"
          ></pref>
         </v-col>
    </v-row>
    </div>
    <div v-if="genresExist">
    <h2 class="white--text mt-10 font-weight-bold">Browse all</h2>
    <v-row>
      <v-col  xs="12" sm="6" md="3" lg="2"  v-for="genre in genres"
      :key="genre._id">
      <Genres
        class="mt-3"
        :source="genre.icons[0].url"
        :title="genre.name"
        :route="genre._id"
      ></Genres>
    </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script>
import client from 'api-client';
import Genres from '../../components/GenresCard.vue';
import pref from '../../components/prefGenres.vue';
import SongCard from '../../components/SongCard.vue';
import ArtistCard from '../../components/ArtistCard.vue';

export default {
  name: 'Search',
  components: {
    Genres,
    pref,
    SongCard,
    ArtistCard,
  },
  data() {
    return {
      genres: [],
      PGenres: [],
      RecentSearch: [],
      genresExist: false,
      RecentLength: 0,
      PGenresExist: false,
      RecentExist: false,
    };
  },
  methods: {
    async fetchAllGenres() {
      this.genres = await client.fetchGenres();
      if (this.genres.length > 0) {
        this.genresExist = true;
      } else this.genres = {};
    },
    History() {
      this.$router.push('/home/search/history/showRecent');
    },
  },
  async created() {
    this.fetchAllGenres();
    // this.fetchAllPrefG();
    this.RecentSearch = JSON.parse(localStorage.getItem('SearchHistory') || '[]');
    if (this.RecentSearch.length !== 0) {
      this.RecentExist = true;
      if (this.RecentSearch.length > 6) {
        this.RecentLength = 6;
      } else {
        this.RecentLength = this.RecentSearch.length;
      }
    }
  },
  mounted() {
    this.$store.state.searching = true;
  },

  updated() {
    this.$store.state.searching = true;
  },

  destroyed() {
    this.$store.state.searching = false;
  },
};
</script>

<style scoped>
.RECENT:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
