import { reactive } from 'vue'

export default reactive({
  loading: false,
  filters: true,
  isMobile: false,
  stories: true,

  filterModel: {
    safe: true,
    unsafe: true,
    gender: 0,
    age: 0,
    orientation: 0,
  },
})
