<template>
  <addEditComponent :temp="temp" :type="'add'"/>
</template>

<script>
import addEditComponent from '../components/addEditComponent'
export default {
  components: { addEditComponent },
  data () {
    return {
      temp: {
        type: '',
        name: '',
        principal: '',
        phone: '',
        address: '',
        landline: '',
        jiansheManager: '',
        shigongManager: '',
        jianliManager: '',
        kanchaManager: '',
        shejiManager: '',
        jiansheUnit: '',
        shigongUnit: '',
        jianliUnit: '',
        kanchaUnit: '',
        shejiUnit: ''
      }
    }
  }
}
</script>