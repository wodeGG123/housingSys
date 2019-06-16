<template>
  <addEditComponent :temp="temp" :type="'edit'"/>
</template>

<script>
import addEditComponent from './components/addEditComponent'
export default {
  components: { addEditComponent },
  data () {
    return {
      temp: {
        name: '',
        unitId: '',
        phone: ''
      }
    }
  }
}
</script>