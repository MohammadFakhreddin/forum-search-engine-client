export default {
  data () {
    return {
      searchResults: []
    }
  },
  created () {
    if (this.$route.params == null || this.$route.params.res == null) {
      this.$router.push({name: 'index'})
      return
    }
    this.searchResults = this.$route.params.res
  }
}
