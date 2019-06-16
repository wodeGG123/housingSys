<template>
  <addEditComponent :temp="temp" :type="'edit'" @getDetail="getDetails"/>
</template>

<script>
import { getProjecDetails } from '@/api/project/government'
import addEditComponent from '../components/addEditComponent'
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
      getProjecDetails(obj).then(res => {
        console.log(res.data)
        const data = res.data
        this.temp = data.data
      })
    }
  }
}
</script>