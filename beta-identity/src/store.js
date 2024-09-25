import { reactive } from 'vue'

export default {
  filterModel: reactive({
    stories: true,
    safe: true,
    unsafe: true,
    gender: 0,
    age: 0,
    orientation: 0,
  }),
}
