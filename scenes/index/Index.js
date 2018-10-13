import EditText from './../../components/edit_text/EditText.vue'
import HeaderText from './../../components/header_text/HeaderText.vue'
import { AppName } from './../../Constants.js'

export default {
  components: {
    'edit-text': EditText,
    'header-text': HeaderText
  },
  data: function () {
    return {
      searchValue: '',
      appName: AppName,
      isLoading: false,
      errorText: null
    }
  },
  methods: {
    onSearchButtonClicked: async function () {
      if (this.searchValue == null || this.searchValue.trim() === '') {
        return
      }
      this.$router.push({ name: 'SearchResults',
        query: {
          currentPage: 1,
          searchValue: this.searchValue
        }
      })
    }
  }
}
