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
        type: '',
        name: '',
        principal: '',
        phone: '',
        createTime: null,
        lastTime: null
      }
    }
  }
}
</script>