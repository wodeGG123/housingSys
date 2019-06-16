<template>
  <addEditComponent :temp="temp" :type="'edit'" @getDetail="getDetails"/>
</template>

<script>
import { getPaperworkDetails } from '@/api/paperwork'
import addEditComponent from './components/addEditComponent'
export default {
  components: { addEditComponent },
  data () {
    return {
      temp: null,
      id: this.$route.params.id
    }
  },
  mounted () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      const obj = {
        id: this.id
      }
      console.log(obj)
      getPaperworkDetails(obj).then(res => {
        console.log(res)
        const data = res.data
        this.temp = data.data
        this.$store.commit('paperworkDetail', data.data)
      })
    }
  }
}
</script>
