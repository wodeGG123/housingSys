<template>
  <view-box>
    <div class="list-wrapper">
      <div class="title">
       <span>整改通知列表</span>
       <span class="add-icon" 
         @click="$router.push('/baseinfos/NoticeManange/add')">
         <svg-icon icon-class="add"></svg-icon>
       </span>
       </div>
      <div class="list-item" v-for="(item, index) of noticeList" 
        :key="index" @click="$router.push({ name: 'NoticeManangeEdit', params: { id: item.id } })">
        <!-- <div class="left-img">
          <img :src="item.avator" alt="">
        </div> -->
        <div class="info">
          <p class="circle"></p>
          <p class="orange"><svg-icon icon-class="name"/>{{item.name}}</p>
          <!-- <p><svg-icon icon-class="unitType"/>员工类型： {{item.type|NoticeTypeFilter}}</p> -->
          <p class="blue"><svg-icon icon-class="phone"/>{{item.phone}}</p>
          <p><svg-icon icon-class="unitType"/>单位类型：{{item.unit.type|typeFilter}}</p>
          <p><svg-icon icon-class="belongUnit"/>{{item.unitId|unitFilter(allUnitList)}}</p>
        </div>
        <div class="operate">
          <!-- <span @click="$router.push({ name: 'NoticeManangeEdit', params: { id: item.id } })">编辑</span> -->
          <span @click.stop="handleDelete(item.id)"><svg-icon icon-class="delete" style="font-size: 1.2em"/></span>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import { getNoticeList, deleteNotice } from '@/api/baseinfos/notice'
export default {
  props: {
    listQuery: Object
  },
  data () {
    return {
      noticeList: []
    }
  },
  mounted () {
    this.getNoticeList()
    // this.getUnitList()
  },
  // filters: {
  //   NoticeTypeFilter (val) {
  //     const obj = {
  //       1: '项目负责人'
  //     }
  //     return obj[val]
  //   },
  //   unitFilter(val, allUnitList) {
  //     return allUnitList.filter(item => item.id === val)[0].name
  //   },
  //   typeFilter (val) {
  //     const obj = {
  //       0: '建设',
  //       1: '施工',
  //       2: '监理',
  //       3: '勘察',
  //       4: '设计'
  //     }
  //     return obj[val]
  //   }
  // },
  methods: {
    // getUnitList () {
    //   getUnitList().then(res => {
    //     const data = res.data
    //     console.log(data)
    //     if (data.result) {
    //       this.allUnitList = data.data
    //     }
    //   })
    // },
    getNoticeList () {
      console.log(this.listQuery)
      getNoticeList(this.listQuery).then(res => {
        console.log(res)
        const data = res.data
        if (data.result && data.data) {
          this.noticeList = data.data
        }
      })
    },
    // handleDelete (id) {
    //   const obj = {
    //     'ids[]': id
    //   } 
    //   const _this = this
    //   this.$vux.confirm.show({
    //     title: '操作',
    //     content: '是否确认删除？',
    //     closeOnConfirm: false,
    //     onConfirm () {
    //       deleteNotice(obj).then(res => {
    //         console.log(res)
    //         const data = res.data
    //         if (data.result) {
    //           _this.$vux.confirm.hide()
    //           _this.$vux.alert.show({
    //             title: '删除成功'
    //           })
    //           _this.getNoticeList()
    //         }
    //       })
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.list-item{
  padding: .5rem .8rem;
  box-shadow: 1px 1px 3px #999;
  border-bottom: none;
  margin: 0 .2rem;
  margin-top: 1rem;
}
.info{
  
}
.circle{
  width: .65rem;
  height: .65rem;
  background: #efb336;
  border-radius: 50%;
  position: relative;
  left: -.7rem;
  top: -.5rem;
}
.info p {
  line-height: 1.6rem
}
.info .svg-icon{
  color: #666;
  font-size: 1.1em;
  padding-right: .4rem
}
</style>