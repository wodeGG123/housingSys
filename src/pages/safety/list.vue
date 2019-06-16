<template>
<div class="wrap">
  <x-header class="header" :title="title"><router-link to="/" slot="right">
        <img class="icon-home" :src="require('../../assets/image/icon/icon-home.png')" alt="">
      </router-link></x-header>
  <div class="list">
      <div class="search">
      <x-input
       :debounce="1000"
       @on-change="onSubmit"
       class="input"
       placeholder="搜索..."
       label-width="0"
       title=""
       :show-clear="false"
       v-model="value"></x-input>
      <img :src="require('@/assets/image/icon/icon-search.png')" alt="">
    </div>
    <div class="title">
      <img :src="require('@/assets/image/icon/icon-list-title.png')" alt="">
      <span class="text">整改通知列表</span>
    </div>
    <div class="list-wrap">

  <div class="re-top" v-for="(item, index) in listContent" @click="listItem(item.id)" :key="index">
    <p>检查日期:{{item.createTime}}</p>
    <p>检查人:{{item.rummage}}</p>
    <div>状态:   <span class="status" v-if="item.status==1 ">已整改</span>
      <span class="status status-a" v-else>未整改</span>
    </div>
    <p>签发人:{{item.signer}}</p>
    <p>更新日期:{{item.lastTime}}</p>
  </div>
</div>
  </div>
</div>
</template>

<script>
import { XHeader, Search } from 'vux'

import {getList} from '@/api/project/government'

export default {
  name: 'list',
  data () {
    return {
      listContent: [],
      title: '整改通知列表',
      value: '',
      results: []
    }
  },
  components: {
    XHeader,
    Search
  },
  created () {
    this.getList()
    // getList({}).then(res => {
    //   this.listContent = res.data.data
    // })
  },
  methods: {
    getList (params) {
      getList({projectName: params}).then(res => {
        this.listContent = res.data.data
      })
    },
    resultClick (item) {
      console.log(JSON.stringify(item))
      let result = JSON.stringify(item)
      this.value = result.title
    },
    getResult (val) {
      console.log('on-change', val)
      // this.results = val ? this.getResult(this.value) : []
    },
    onSubmit (val) {
      debugger
      console.log('1', val)
      this.$refs.search.setBlur()
      console.log('on-change', this.results)
      if (val) this.getList(val)
    },
    onCancel () {},
    onFocus () {},
    listItem (id) {
      this.$router.push(`/safety/detail/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  padding-top:49px;
  min-height: 100%;
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
  .title{
  width: calc(100% - 20px);
  height: 50px;
  background: #ffffff;
  border-radius: 5px;
  border: none;
  margin: 0 auto;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  &::before{
    background: url('../../assets/image/icon/icon-chain.png');
    content: '';
    display: block;
    width: 10px;
    height: 31px;
    background-size: 100% 100%;
    position: absolute;
    left: 20px;
    bottom: -18px;
  }
  &::after{
    background: url('../../assets/image/icon/icon-chain.png');
    content: '';
    display: block;
    width: 10px;
    height: 31px;
    background-size: 100% 100%;
    position: absolute;
    right: 20px;
    bottom: -18px;
  }
  img{
    width: 17px;
    vertical-align: middle;
  }
  .text{
    font-size: 1rem;
    vertical-align: middle;
    margin-left: 4px;
    color: #3EB4FA;
  }
  .add-icon{
    border: none;
    width: initial;
    font-weight: normal;
    font-size: 1.1rem;
  }
}
.list-wrap{
 width: calc(100% - 20px);
  margin: 5px auto;
  background:rgba(255,255,255,1);
  border-radius:5px;
  box-sizing: border-box;
  padding: 10px;
  .re-top{
    color: #999;
    padding: 10px 0;
    border-bottom: 1px dashed #3EB1F9;
    &:last-child{
      border-bottom: none;
    }
  }
  .status {
  padding: 3px 6px;
  background-color: #15C98C;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
}
.status-a {
  background-color: #C64025;
}
}
</style>
