export default{
  data () {
    return {}
  },
  components: {},
  props: [
    'placeHolder',
    'inputMode',
    'width',
    'textColor',
    'height',
    'inputValue'
  ],
  methods: {
    updateInputValue: function (value) {
      this.$emit('input', value)
    }
  }
}