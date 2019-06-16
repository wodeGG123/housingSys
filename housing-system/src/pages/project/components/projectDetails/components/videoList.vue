<template>
<div class="wrap">
  <div class="title">
    <img :src="require('../../../../../assets/image/icon/icon-camera.png')" alt="">
      <span>摄像头列表</span>
      <span class="plus"
        @click="$router.push('')">
       添加+
      </span>
    </div>
      <div class="list-item-wrap" >
<div class="list-item" v-for="(item, index) of videoList"
      :key="index" @click="$router.push({ name: 'video', params: { id: item.id } })">
      <div class="info">
        <p class="info-item-title">
          <i></i>
          <b>{{item.name}}</b>
        </p>
        <p>描述: {{item.description}}</p>
        <p>设备号：{{item.code}}</p>
        <p>通道号：{{item.channal}}</p>
      </div>
      <div class="operate">
        <span @click="handleDelete(item.id)">删除</span>
      </div>
    </div>
      </div>
</div>
</template>

<script>
import { getCameraList } from '@/api/project/government'
export default {
  data () {
    return {
      videoList: []
    }
  },
  created () {
    getCameraList().then(res => {
      console.log(res)
      if (+res.status === 200) {
        this.videoList = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
.wrap{
  margin-top: 10px;
  .title{

height:50px;
background:rgba(255,255,255,1);
border-radius:5px;
line-height: 50px;
padding-left: 10px;
padding-right: 10px;
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
    .plus{
      float: right;
      color: #E34627;
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
    i{
      position: relative;
      display: inline-block;
      width:20px;
height:18px;
background:linear-gradient(90deg,rgba(62,180,250,1),rgba(59,13,217,1));
vertical-align: middle;
&::before{
  content:'';
  display: block;
  border-top:5px solid transparent;
  border-right:5px solid transparent;
  border-bottom:5px solid transparent;
  border-left:5px solid #fff;
  position: absolute;
  top: 4px;
    left: 7px;
}
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
  .operate {
    display: inline-block;
    width: 6rem;
    height: 5rem;
    line-height: 10rem;
    text-align: right;
    padding-right: .5rem;
    margin: auto 0;
    color: #E34627;
}
}

</style>
