<template>
  <div id="app">
    <XHeader v-if="$route.meta.title && $route.meta.title !== '首页'">{{$route.meta.title}}
      <router-link to="/" slot="right">
        <img class="icon-home" :src="require('./assets/image/icon/icon-home.png')" alt="">
      </router-link>
    </XHeader>
    <div v-transfer-dom>
      <Loading :show="isLoading" text="加载中..."/>
    </div>
    <main :class="'margin-top'" v-if="$route.meta.title && $route.meta.title !== '首页'">
      <router-view/>
    </main>
    <main v-else>
      <router-view/>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
.margin-top{
  padding-top: 3.5rem
}
main{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.icon-home{
  width: 22px;
}
</style>
