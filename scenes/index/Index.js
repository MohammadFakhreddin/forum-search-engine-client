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
      if (this.searchValue.trim() === '') {
        return
      }
      const { statusCode, res, err } = await HttpManager.getInstance().search(this.searchValue)
      if (statusCode !== StatusCodes.ok) {
        console.warn(statusCode)// TODO Show error message instead
        console.warn(err)
        return
      }
      console.warn()
      this.$router.push({ name: 'SearchResults',
        params: {
          res: res
        }
      })
    }
  }
}
