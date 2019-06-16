<template>
  <ViewBox class="list-wraper">
    <div class="search">
      <x-input class="input" placeholder="搜索..." label-width="0" title="" :show-clear="false" v-model="searchValue"></x-input>
      <img :src="require('@/assets/image/icon/icon-search.png')" alt="">
    </div>
    <projectList/>

  </ViewBox>
</template>

<script>
import projectList from '../components/projectList'
export default {
  components: { projectList },
  data () {
    return {
      searchValue: ''
    }
  }
}
</script>
<style lang="less" scoped>
.list-wraper{
  background-color: #F5F5F5;
}
  .search{
    position: relative;
    width:calc(100% - 20px);
    height:39px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:5px;
    margin: 10px auto;
    .input{
      width: 80%;
    }
    img{
      width: 1.2rem;
      position: absolute;
      right: 1rem;
      top: 0.8rem;
    }
  }
</style>
