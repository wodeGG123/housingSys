<template>
<div>
<div class="title">
      <img :src="require('../../../../../assets/image/icon/icon-tower.png')" alt=""> <span>塔吊信息</span>
      <!-- <span class="add-icon"
        @click="$router.push('')">
        <svg-icon icon-class="add"></svg-icon>
      </span> -->
    </div>
    <div class="list-item-wrap" >
<div class="list-item" v-for="(item, index) of towerList"
      :key="index" @click="showDialog(item.id,item.filingNO)">
      <div class="info">
        <h5 class="info-item-title">
          <img :src="require('../../../../../assets/image/icon/icon-list.png')" alt="">
          <b class="orange">
             {{item.filingNO}}
             {{item.deviceManufactureCompanyName}}</b>
        </h5>
        <p>类型：{{item.tCType|typeFilter}}</p>
        <p>前臂长: {{item.l1}}</p>
        <p>塔高：{{item.h1}}</p>
        <p>更新时间： {{item.syncDate}}</p>
      </div>
      <!-- <div class="operate">
        <span @click="handleDelete(item.id)">删除</span>
      </div> -->
    </div>
    </div>

    <dialogTower :showHideOnBlur="showHideOnBlur" :temp="temp" :title="currentTower" />
  </div>
</template>

<script>
import { getTowerList, getTowerDetails } from '@/api/project/government'
import dialogTower from './dialogTower'
export default {
  components: { dialogTower },
  data () {
    return {
      showHideOnBlur: false,
      temp: {},
      towerList: [
        {name: ''}
      ],
      currentTower: ''
    }
  },
  created () {
    this.getTowerList()
  },
  filters: {
    typeFilter (val) {
      const obj = {
        0: '平臂塔吊',
        1: '动臂塔吊',
        2: '塔头塔吊',
        3: '导轨塔吊'
      }
      return obj[val]
    }
  },
  methods: {
    getTowerList () {
      const obj = {
        projectId: this.$route.params.id
      }
      getTowerList(obj).then(res => {
        const data = res.data
        this.towerList = data.data
      })
    },
    showDialog (id, name) {
      this.getTowerDetails(id)
      this.currentTower = name
      this.showHideOnBlur = true
    },
    getTowerDetails (id) {
      const obj = {
        towerId: id
      }
      getTowerDetails(obj).then(res => {
        const data = res.data
        this.temp = data.ext
        console.log(this.temp)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .title{

height:50px;
background:rgba(255,255,255,1);
border-radius:5px;
line-height: 50px;
padding-left: 10px;
position: relative;
&::before{
    background: url('../../../../../assets/image/icon/icon-chain.png');
    content: '';
    display: block;
    width: 10px;
    height: 31px;
    background-size: 100% 100%;
    position: absolute;
    left: 20px;
    bottom: -20px;
  }
  &::after{
    background: url('../../../../../assets/image/icon/icon-chain.png');
    content: '';
    display: block;
    width: 10px;
    height: 31px;
    background-size: 100% 100%;
    position: absolute;
    right: 20px;
    bottom: -20px;
  }
    img{
      width: 17px;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    span{
      vertical-align: middle;
      margin-left: 4px;
      color: #3EB4FA;
      font-weight: bold;
    }
  }
  .list-item-wrap{
    background: #ffffff;
    border-radius: 5px;
    padding-left: 10px;
    padding-top: 1px;
    margin-top: 6px;
  }
  .info-item-title{
    margin-bottom: 5px;
    img{
      width: 18px;
      vertical-align: middle;
    }
    b{
      vertical-align: middle;
    }
  }
  .info{
    p{
      color: #999;
    }
  }
  .list-item{
    margin-right: 10px;
  }
</style>
