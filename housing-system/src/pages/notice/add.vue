<template>
  <addEditComponent :temp="temp" :type="'add'"/>
</template>

<script>
import addEditComponent from './components/addEditComponent'
export default {
  components: { addEditComponent },
  data () {
    return {
      temp: {
        title: '',
        content: '',
        crDate: '',
        createUserId: '',
        createUserName: '',
        updateUserId: '',
        updateDate: '',
        updateUserName: ''
      }
    }
  },
  mounted () {
    this.$store.commit('noticeDetail', this.temp)
  }
}
</script>