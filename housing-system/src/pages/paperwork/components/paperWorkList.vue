<template>
  <view-box>
    <div class="list-wrapper">
      <div class="title">
        <span><svg-icon icon-class="parperwork"></svg-icon>文书</span>
        <span class="add-icon"
          @click="$router.push('/paperwork/add')">
          <svg-icon icon-class="add"></svg-icon>
        </span>
      </div>
      <div class="list-item" v-for="(item, index) of paperworkList"
        :key="index"
        @click="$router.push({ name: 'paperworkEdit', params: { id: item.id } })">
        <p class="zhiding" v-if="index === 0">
          <svg-icon icon-class="toper"></svg-icon></p>
        <div class="info">
          <p><svg-icon icon-class="project"/><b>{{item.title}}</b></p>
          <div v-html="item.content" class="content"></div>
          <p class="cr-time">发布时间：{{item.crDate}} </p>
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
import { getPaperworkList, deletePaperwork } from '@/api/paperwork'
export default {
  data () {
    return {
      paperworkList: []
    }
  },
  mounted () {
    this.getPaperworkList()
  },
  methods: {
    getPaperworkList () {
      getPaperworkList().then(res => {
        console.log(res)
        const data = res.data
        console.log(data)
        console.log(data)
        if (data.result) {
          this.paperworkList = data.data
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
        'ids': id
      }
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          deletePaperwork(obj).then(res => {
            const data = res.data
            if (data.result) {
              _this.$vux.confirm.hide()
              _this.$vux.alert.show({
                title: '删除成功'
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
                _this.getPaperworkList()
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
