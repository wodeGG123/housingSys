<template>
  <addEditComponent :temp="temp" :type="'edit'" @getDetail="getDetails"/>
</template>

<script>
import { getUnitList } from '@/api/baseinfos/unit'
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
      getUnitList(obj).then(res => {
        const data = res.data
        console.log(data)
        if (data.result && data.data) {
          this.temp = data.data[0]
        }
      })
    }
  }
}
</script>