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
    'inputValue',
    'extraStyle',
    'startValue',
    'input'
  ],
  methods: {
    updateInputValue: function (value) {
      this.$emit('input', value)
    }
  }
}
