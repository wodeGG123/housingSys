<template>
  <view-box>
  	<div class="list-wrapper">
      <div class="title">
	      <span><svg-icon icon-class="notice"></svg-icon>公告</span>
	      <span class="add-icon"
	        @click="$router.push('/notice/add')">
	       	<svg-icon icon-class="add"></svg-icon>
	      </span>
      </div>
      <div class="list-item" v-for="(item, index) of noticeList"
        :key="index"
        @click="$router.push({ name: 'noticeEdit', params: { id: item.id } })">
        <p class="zhiding" v-if="index === 0">
          <svg-icon icon-class="toper"></svg-icon>
        </p>
        <div class="info">
          <p><svg-icon icon-class="project"/><b>{{item.title}}</b></p>
          <div v-html="item.content" class="content"></div>
          <p>发布时间：{{item.crDate}} </p>
        </div>
        <div class="operate">
          <span @click.stop="handleDelete(item.id)">
            <svg-icon icon-class="delete"/></span>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { getNoticeList, deleteNotice } from '@/api/notice'
export default {
  data () {
    return {
      listQuery: {
        PageInfo: {
          iDisplayLength: 3,
          iDisplayStart: 1,
          sEcho: '',
          iColumns: '',
          iSortingCols: ''
        },
        Unit: {
          type: '',
          name: '',
          principal: '',
          phone: '',
          createTime: '',
          lastTime: ''
        }
      },
      noticeList: []
    }
  },
  mounted () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      getNoticeList().then(res => {
        console.log(res)
      	const data = res.data
        console.log(data)
        console.log(data)
        if (data.result) {
          this.noticeList = data.data
        } else {
          this.$vux.alert.show({
            title: '请求失败',
            content: '列表获取失败'
          })
        }
      }).catch(() => {
        this.$vux.alert.show({
          title: '请求失败',
          content: '列表获取失败'
        })
      })
    },
    handleDelete (id) {
      const obj = {
        'ids[]': id
      }
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          deleteNotice(obj).then(res => {
            const data = res.data
            if (data.result) {
              _this.$vux.confirm.hide()
              _this.$vux.alert.show({
                title: '删除成功'
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
                _this.getNoticeList()
              }, 1000)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrapper{
  width: 100vw;
  overflow: hidden;
}
  .content{
    width: 100%;
    padding: .5rem;
    margin: 0;
    overflow: hidden;
  }
  .content img{
    width: 100%;
  }
  .title .svg-icon{
    padding-right: .3rem
  }
  .title::before{
    height: 0;
    width: 0
  }
</style>
