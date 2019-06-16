<template>
  <ViewBox>
    <search
      v-model="searchValue"
      position="absolute"
      :auto-fixed='false'
      auto-scroll-to-top
      top="46px"
      ref="search">
     <!--  @result-click="resultClick"
      @on-change="getResult"
      :results="results" -->
      </search>
    <projectWorkerList/>
  </ViewBox>
</template>

<script>
import projectWorkerList from './components/projectWorkerList'
export default {
  components: { projectWorkerList },
  data () {
    return {
      searchValue: ''
    }
  }
}
</script>