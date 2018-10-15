import BodyText from './../../components/body_text/BodyText.vue'
import HeaderText from './../../components/header_text/HeaderText.vue'
import { HttpManager } from './../../network/HttpManager'
import { StatusCodes, AppName } from './../../Constants'
import EditText from './../../components/edit_text/EditText.vue'

export default {
  data () {
    return {
      searchResults: [],
      currentPage: 1,
      hasNextPage: false,
      searchValue: '',
      currentPageText: 'صفحه ی ۱',
      appName: AppName,
      isLoading: false,
      errorText: null
    }
  },
  components: {
    'body-text': BodyText,
    'header-text': HeaderText,
    'edit-text': EditText
  },
  created: function () {
    if (this.$route.query == null ||
      this.$route.query.searchValue == null ||
      this.$route.query.searchValue === ''
    ) {
      this.$router.push({name: 'index'})
      return
    }
    this.currentPage = Number(this.$route.query.currentPage)
    this.searchValue = this.$route.query.searchValue
    this.updateCurrentPageText()
    if (this.isLoading === true) {
      return
    }
    this.goToPage(this.currentPage)
  },
  methods: {
    goToPage: async function (pageNumber) {
      const normalizedSearchValue = this.searchValue.trim()
      if (normalizedSearchValue === '') {
        return
      }
      this.$router.push({ name: 'SearchResults',
        query: {
          currentPage: pageNumber,
          searchValue: this.searchValue
        }
      })
      this.currentPage = pageNumber
      this.updateCurrentPageText()
      this.searchResults = []
      this.isLoading = true
      const { statusCode, res, err, hasNextPage } = await HttpManager.getInstance().search(normalizedSearchValue, this.currentPage)
      this.isLoading = false
      if (statusCode !== StatusCodes.ok) {
        console.warn(statusCode)// TODO Show error message instead
        console.warn(err)
        this.errorText = 'خطا در اتصال '.concat(statusCode)
        setTimeout(() => {
          this.errorText = null
        }, 4000)
      }
      this.hasNextPage = hasNextPage
      this.searchResults = res
    },
    previousPage () {
      if (this.currentPage !== 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    nextPage () {
      if (this.hasNextPage) {
        this.goToPage(this.currentPage + 1)
      }
    },
    updateCurrentPageText () {
      this.currentPageText = `صفحه ی ${this.currentPage}`
    },
    onSearchButtonClicked () {
      if (this.isLoading === false) {
        this.goToPage(1)
      }
    },
    onSearchValueChanged (value) {
      this.searchValue = value
      console.warn(this.searchValue)
    }
  }
}
