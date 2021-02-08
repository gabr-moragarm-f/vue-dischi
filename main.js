var app = new Vue({
  el: '#root',
  data:{
    diskList: [],
    genreList:['All'],
    selectedGenre: 'All',
    userSearchInput: '',
  },
  mounted() {
    let self = this;

    axios.get('https://flynn.boolean.careers/exercises/api/array/music')
    .then(function(response) {
      self.diskList = response.data.response

      for (var i = 0; i < response.data.response.length; i++) {
        if (!self.genreList.includes(response.data.response[i].genre)) {
          self.genreList.push(response.data.response[i].genre);
        }
      }
    });
  },
  methods:{
    genreFilter: function(genre) {
      if (this.selectedGenre === 'All') {
        return true;
      }

      if (this.selectedGenre === genre) {
        return true;
      }

      if (this.selectedGenre !== genre) {
        return false;
      }
    },
    searchFilter: function(element) {

      if (this.userSearchInput === '') {
        return true;
      }

      if (element.author.toLowerCase().includes(this.userSearchInput.toLowerCase())) {
        return true;
      }

      if (element.title.toLowerCase().includes(this.userSearchInput.toLowerCase())) {
        return true;
      }

      if (element.year.toLowerCase().includes(this.userSearchInput.toLowerCase())) {
        return true;
      }

      return false;
    }
  }
});

Vue.config.devtools = true;
