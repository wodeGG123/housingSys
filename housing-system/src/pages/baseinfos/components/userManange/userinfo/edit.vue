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
        name: '王美',
        gender: '女',
        birthday: '1992-09-21',
        address: '四川省成都市锦江区'
      }
    }
  }
}
</script>