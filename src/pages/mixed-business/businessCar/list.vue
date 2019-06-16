<template>
  <ViewBox class="wrapper">
    <div class="title">
      <span>车辆列表</span>
      <span class="look-all blue" @click="$router.push({ name: 'map', params: { companyId: $route.params.id, id: '' } })">查看所有车辆位置>></span>
    </div>

    <div v-for="item of carList" :key="item.id">
      <carListItem :simpleDetail="item"/>
    </div>
  </ViewBox>
</template>

<script>
import carListItem from '../components/carListItem'
import { getCarStausList } from '@/api/business'
export default {
  components: { carListItem },
  data () {
    return {
      companyId: this.$route.params.id,
      carList: []
    }
  },
  mounted () {
    this.getCarList()
  },
  methods: {
    getCarList () {
      const obj = {
        mixedId: this.companyId
      }
      getCarStausList(obj).then(res => {
        console.log(res)
        const data = res.data
        this.carList = data.data
      })
    }
  }
}
</script>

<style scoped>
  .wrapper{
    padding: .3rem;
  }
  .look-all{
    float: right;
  }
</style>
