import EditText from '~/components/edit_text/EditText.vue'
import HeaderText from '~/components/header_text/HeaderText.vue'
import { HttpManager } from '~/network/HttpManager.js'
import { StatusCodes } from '~/Constants.js'

export default {
  components: {
    'edit-text': EditText,
    'header-text': HeaderText
  },
  data: function () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onSearchButtonClicked: async function () {
      const normalizedSearchValue = this.searchValue.trim()
      if (normalizedSearchValue === '') {
        return
      }
      const { statusCode, res, err, hasNextPage } = await HttpManager.getInstance().search(normalizedSearchValue, 1)
      if (statusCode !== StatusCodes.ok) {
        console.warn(statusCode)// TODO Show error message instead
        console.warn(err)
        return
      }
      console.warn()
      this.$router.push({ name: 'SearchResults',
        params: {
          res: res,
          currentPage: 1,
          hasNextPage: hasNextPage,
          searchValue: normalizedSearchValue
        }
      })
    }
  }
}
