<template>
  <div class="wrapper">
    <div class="header" @click="$router.push('/login')">
      <div class="header-img">
        <img :src="require('../../assets/image/thumb.png')" alt="头像">
      </div>
      <div class="user">
        欢迎你，{{name.name}}&nbsp;{{name.username}}
      </div>
    </div>
    <div class="scroll-swiper">
      <img :src="require('../../assets/image/index-text.png')" alt="">
    </div>

    <div class="nav-tab">

      <dl v-for="item of girdItems" :key="item.id">
        <router-link :to="item.linkUrl">
        <dt><img :src="item.icon" ></dt>
        <dd>{{item.label}}</dd>
         </router-link>
      </dl>

    </div>
    <div class="footer">
      中国移动提供技术支持
    </div>
  </div>
</template>

<script>

import { getUsername } from '@/utils/auth'
export default {
  name: 'home',
  data () {
    return {
      girdItems: [
        { id: 1, label: '项目管理', linkUrl: '/project', icon: require('../../assets/image/icon/icon-index-1.png') },
        { id: 2, label: '安全文明管理', linkUrl: '/safety', icon: require('../../assets/image/icon/icon-index-2.png') },
        { id: 3, label: '公告', linkUrl: '/notice', icon: require('../../assets/image/icon/icon-index-3.png') },
        { id: 4, label: '民工实名制管制', linkUrl: '/migrantWorker', icon: require('../../assets/image/icon/icon-index-4.png') },
        { id: 5, label: '商混企业', linkUrl: '/business', icon: require('../../assets/image/icon/icon-index-5.png') },
        { id: 6, label: '文书', linkUrl: '/paperwork', icon: require('../../assets/image/icon/icon-index-6.png') },
        { id: 7, label: '基础信息', linkUrl: '/baseinfos', icon: require('../../assets/image/icon/icon-index-7.png') }
      ],
      name: {}
    }
  },
  created () {
    this.name = getUsername()
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  position: relative;
  height: 100%;
  background-color: #063248;
  background-image: url('../../assets/image/index-back.png');
  background-size: 100% 100%;
  .header{
    position: absolute;
    left: 10px;
    top: 10px;
    display: flex;
    .header-img{
      img{
        width: 25px;
        height: 25px;
        display: block;
      }
    }
    .user{
      margin-left: 6px;
    color: #fff;
    font-size: 12px;
    line-height: 25px;
    }
  }
  .scroll-swiper{
    height: 180px;
    width: 100%;
    background-image: url('../../assets/image/banner.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 32px;
    }
  }
  .nav-tab{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;
    dl{
      width: 170px;
      height: 76px;
      background-image: url('../../assets/image/index-item-wrap.png');
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
