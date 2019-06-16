<template>
  <addEditComponent :temp="temp" :type="'edit'" @getDetail="getDetails"/>
</template>

<script>
import { getNoticeDetails } from '@/api/notice'
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
      getNoticeDetails(obj).then(res => {
        console.log(res)
        const data = res.data
        this.temp = data.data
        this.$store.commit('noticeDetail', data.data)
      })
    }
  }
}
</script>
