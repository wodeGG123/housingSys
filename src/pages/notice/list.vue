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
    <noticeList/>
  </ViewBox>
</template>

<script>
import noticeList from './components/noticeList'
export default {
  components: { noticeList },
  data () {
    return {
      searchValue: ''
    }
  }
}
</script>