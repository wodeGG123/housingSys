<template>
  <ViewBox>
    <x-header>项目详情
      <router-link to="/" slot="right">
        <img class="icon-home" :src="require('../../../../assets/image/icon/icon-home.png')" alt="">
      </router-link>
      </x-header>
    <div class="detail-wrap">
      <tab :line-width="1" active-color="#3EB4FA" class="tab">
        <tab-item :selected='activedTab == 0' @on-item-click="tabItemClik">基础信息</tab-item>
        <tab-item :selected='activedTab == 1' @on-item-click="tabItemClik">安全信息</tab-item>
        <tab-item :selected='activedTab == 2' @on-item-click="tabItemClik">整改通知</tab-item>
      </tab>
      <keep-alive>
        <component :is="tempComponent[activedTab]" :details="projectDetails"/>
      </keep-alive>
    </div>

  </ViewBox>
</template>

<script>
import { getProjecDetails } from '@/api/project/government'
import baseInfo from './components/baseInfo'
import safeInfo from './components/safeInfo'
import rectificateNotice from './components/rectificateNotice'
export default {
  components: { baseInfo, safeInfo, rectificateNotice },
  data () {
    return {
      id: this.$route.params.id,
      projectDetails: {},
      activedTab: 0,
      tempComponent: { 0: 'baseInfo', 1: 'safeInfo', 2: 'rectificateNotice' }
    }
  },
  created () {
    this.getProjecDetails()
  },
  methods: {
    getProjecDetails () {
      const obj = {
        id: this.id
      }
      getProjecDetails(obj).then(res => {
        const data = res.data
        console.log(res)
        this.projectDetails = data.data
        console.log('de', data.data)
      })
      console.log(this.projectDetails)
    },
    tabItemClik (index) {
      this.activedTab = index
    }
  }
}
</script>
<style lang="less" scoped>
  .detail-wrap{
    background-color: #F5F5F5;
    min-height: 100%;
    .tab{
      background-color: transparent;
      /deep/ .vux-tab{
        background-color: transparent;
      }
    }
  }
</style>
