import { reactive } from 'vue'

export default {
  filterModel: reactive({
    stories: false,
    safe: true,
    unsafe: false,
    gender: 0,
    orientation: 0,
  }),
}
