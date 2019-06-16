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
        name: '',
        roleCode: '',
        status: '',
        rank: '',
        createTime: '',
        roleDesc: ''
      }
    }
  }
}
</script>