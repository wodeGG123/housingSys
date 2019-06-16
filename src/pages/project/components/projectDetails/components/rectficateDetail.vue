<template>
    <div class="detail">
      <div class="title">
        <img :src="require('../../../../../assets/image/icon/icon-notification-1.png')" alt=""><span>整改通知</span>
      </div>
      <div class="content">
        <p>
          检查人: {{content.rummage}}
        </p>
        <p>签发人: {{content.signer}}</p>
        <p>
          备注: {{content.remark}}
        </p>
        <p>
          整改意见:  <span v-html="content.claim">{{content.claim}}</span>
        </p>
      </div>
      <div class="title">
        <img :src="require('../../../../../assets/image/icon/icon-notification-2.png')" alt="">
        <span>单位回复列表</span>
      </div>
      <div v-if="content.listReplys.length > 0" >
      <div class="content" v-for="(item,index) in content.listReplys" :key="index">
        <div v-if="item.unitType === 0 ">
          单位类型: 建设
        </div>
        <div v-else-if="item.unitType  === 1">
          单位类型: 施工
        </div>
        <div v-else-if="item.unitType  === 2">
          单位类型: 监理
        </div>
        <div v-else-if="item.unitType  === 3">
          单位类型: 勘察
        </div>
        <div v-else>
          单位类型:  设计
        </div>
        <div>
          负责人: {{item.principal}}
        </div>
        <div>
          回复: {{item.reply}}
        </div>
      </div>
      </div>
      <div class="content" v-if="content.listReplys.length=== 0">暂无相关数据！</div>
      <div class="title">
        <img :src="require('../../../../../assets/image/icon/icon-notification-3.png')" alt="">
        <span>整改通知检查项结果</span>
        </div>
      <div v-for="(item,index) in content.listItems" :key="index">
             <div class="content" v-if="item.content === false ">

                 <x-switch :title="item.name"  :value="true" disabled></x-switch>

             </div>
      </div>
      <div class="content" v-if="content.listItems.length=== 0">暂无相关数据！</div>
      <div class="title">
         <img :src="require('../../../../../assets/image/icon/icon-notification-4.png')" alt="">
        <span>整改通知图片</span>
        </div>
      <div class="detailImg content" v-for="(item,index) in content.imgs" :key="index">
        <div class="img">
          <img :src="item" alt="图片">
        </div>
      </div>
      <div class="content" v-if="content.imgs.length=== 0">暂无相关图片！</div>
    </div>

</template>

<script>
import {getSelectById} from '@/api/project/government'
import { Group, PopupRadio, XSwitch } from 'vux'
export default {
  name: 'rectficateDetail',
  data () {
    return {
      content: []
    }
  },
  components: {
    Group, PopupRadio, XSwitch
  },
  created () {
    getSelectById({'id': this.$route.params.id}).then(res => {
      this.content = res.data.data
    })
  }
  // methods: {
  //   onChange(val){
  //       if(val=='建设'){
  //
  //       }
  //   }
  // }

}
</script>

<style lang="less" scoped>
  .detail{
    background-color: #F5F5F5;
    padding:10px;
  .title{

height:50px;
background:rgba(255,255,255,1);
border-radius:5px;
line-height: 50px;
padding-left: 10px;
position: relative;
color: #3EB4FA;
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
.content{
   background: #ffffff;
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 18px;
    padding-bottom: 20px;
    margin-top: 6px;
    margin-bottom: 8px;
    color: #999;

}
 .detailImg{
      img{
        width: 72px;
        height: 72px;
      }
    }
  }
</style>
