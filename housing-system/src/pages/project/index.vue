<template>
  <div class="wrapper">
    <div class="banner">
      <img :src="require('../../assets/image/project-text.png')" alt="">
    </div>
    <div class="items">
      <dl>
        <router-link :to="{path: '/government', query: { type: '1' }}">
        <dt><img :src="require('../../assets/image/icon/icon-project-1.png')" ></dt>
        <dd>棚改</dd>
         </router-link>
      </dl>
      <dl>
        <router-link :to="{path: '/government', query: { type: '2' }}">
        <dt><img :src="require('../../assets/image/icon/icon-project-2.png')" ></dt>
        <dd>公租房</dd>
         </router-link>
      </dl>
      <dl>
        <router-link :to="{path: '/government', query: { type: '0' }}">
        <dt><img :src="require('../../assets/image/icon/icon-project-3.png')" ></dt>
        <dd>房开类</dd>
         </router-link>
      </dl>
    </div>
    <div class="footer">
      中国移动提供技术支持
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  position: relative;
  background-image: url('../../assets/image/index-back.png');
  background-size: 100% 100%;
  height: 100%;
  .banner{
    height: 180px;
    width: 100%;
    background-image: url('../../assets/image/project-banner.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 32px;
    }
  }
  .items{
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px 0;
    justify-content: space-between;
    dl{
      width: 170px;
      height: 76px;
      background-image: url('../../assets/image/project-item-wrap.png');
      background-size: 100% 100%;
      margin-bottom: 10px;
      a{
        width: 100%;
        height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      }

      dt{
        img{
          width: 18px;
          display: block;
        }
      }
      dd{
        margin-left: 4px;
            text-shadow: 0px 0px 12px #fff;
      }
    }
  }
   .footer{
    position: absolute;
    width: 100%;
    bottom: 10px;
    left: 0px;
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
}
</style>
