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
        gender: '男',
        birthday: '',
        address: '四川省成都市锦江区'
      }
    }
  }
}
</script>