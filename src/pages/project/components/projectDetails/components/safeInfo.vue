<template>
  <div class="wrapper">
    <towerList/>
    <videoList/>
    <pollutionMonitoring></pollutionMonitoring>
  </div>
</template>

<script>
import towerList from './towerList'
import videoList from './videoList'
import pollutionMonitoring from './pollutionMonitoring'
export default {
  components: { videoList, towerList, pollutionMonitoring }
}
</script>
<style lang="less" scoped>
  .wrapper{
    padding: 10px;
  }
</style>
