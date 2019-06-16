<template>
  <ViewBox>
    <search
      v-model="searchValue"
      position="absolute"
      :auto-fixed='false'
      auto-scroll-to-top
      top="46px"
      ref="search">
      </search>
    <paperWorkList/>
  </ViewBox>
</template>

<script>
import paperWorkList from './components/paperWorkList'
export default {
  components: { paperWorkList },
  data () {
    return {
      searchValue: ''
    }
  }
}
</script>