import BodyText from '~/components/body_text/BodyText.vue'
import HeaderText from '~/components/header_text/HeaderText.vue'
import { HttpManager } from './../../network/HttpManager'
import { StatusCodes } from './../../Constants'

export default {
  data () {
    return {
      searchResults: [],
      currentPage: 1,
      hasNextPage: false,
      searchValue: '',
      currentPageText: 'صفحه ی ۱'
    }
  },
  components: {
    'body-text': BodyText,
    'header-text': HeaderText
  },
  created () {
    if (this.$route.params == null || this.$route.params.res == null) {
      this.$router.push({name: 'index'})
      return
    }
    this.searchResults = this.$route.params.res
    this.currentPage = this.$route.params.currentPage
    this.hasNextPage = this.$route.params.hasNextPage
    this.searchValue = this.$route.params.searchValue
    this.updateCurrentPageText()
  },
  methods: {
    goToPage: async function (pageNumber) {
      const { statusCode, res, err, hasNextPage } = await HttpManager.getInstance().search(this.searchValue, pageNumber)
      if (statusCode !== StatusCodes.ok) {
        console.warn(statusCode)// TODO Show error message instead
        console.warn(err)
        return
      }
      this.searchResults = res
      this.currentPage = pageNumber
      this.hasNextPage = hasNextPage
      this.updateCurrentPageText()
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
    }
  }
}
