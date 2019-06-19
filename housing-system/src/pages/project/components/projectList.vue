<template>
  <view-box class="list-inner">
    <div class="title">
      <img :src="require('@/assets/image/icon/icon-list-title.png')" alt="">
      <span class="text">项目列表</span>
      <span class="add-icon"
        @click="$router.push('/government/add')">
       添加+
      </span>
    </div>
    <div class="wrapper" :data="projectList">
      <div>
          <div class="list-wrapper" v-if="projectList.length > 0">
          <v-touch class="list-item"
            :class="{'will-delete-item': showDeleteIndexArr.indexOf(index) > -1}"
            :swipe-options="{direction: 'horizontal'}"
            v-for="(item, index) of projectList" :key="item.id"
            v-on:swipeleft="showDelete(index)"
            v-on:swiperight="cancelDelete(index)"
            v-on:tap="$router.push({ name: 'governmentProjectdetails', params: { id: item.id } })">
            <div class="info">
              <p class="item-title"><img :src="require('@/assets/image/icon/icon-list.png')" alt=""><b>{{item.name}}</b></p>
              <p>类别: {{item.type|projectTypeFilter}}</p>
              <p>负责人：{{item.principal}}</p>
              <p>联系电话：{{item.phone}}</p>
            </div>
            <div class="operate red" @click.stop="handleDelete(item.id)"
              v-if="showDeleteIndexArr.indexOf(index) > -1">
              <svg-icon icon-class="delete"/>
            </div>
          </v-touch>
          <div class="no-list-item" v-if="projectList.length === 0">暂无相关数据！</div>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import scroll from '@/components/scroll'
import { getProjectList, deleteProject } from '@/api/project/government'
export default {
  components: { scroll },
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
      projectList: [],
      showDeleteIndexArr: []
    }
  },
  mounted () {
    this.getProjectList()
  },
  filters: {
    projectTypeFilter (val) {
      const obj = {
        0: '其他',
        1: '棚改',
        2: '公租房'
      }
      return obj[val]
    }
  },
  methods: {
    getProjectList () {
      getProjectList({type: this.$route.query.type}).then(res => {
        const data = res.data
        console.log(data)
        console.log(data)
        if (data.result) {
          this.projectList = data.data
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
    showDelete (index) {
      this.showDeleteIndexArr.push(index)
    },
    cancelDelete (index) {
      this.showDeleteIndexArr = this.showDeleteIndexArr.filter(item => item !== index)
    },
    handleDelete (id) {
      this.$router.push('')
      const obj = {
        'ids[]': id
      }
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          deleteProject(obj).then(res => {
            const data = res.data
            if (data.result) {
              _this.$vux.confirm.hide()
              _this.$vux.alert.show({
                title: '删除成功'
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
                _this.getProjectList()
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
.info p:nth-of-type(1){
  padding-bottom: .3rem
}
.info p{
  color: #999999;
}
.item-title{
  img{
    width: 18px;
    vertical-align: middle;
  }
  b{
    vertical-align: middle;
    margin-left: 4px;
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
    background: url('../../../assets/image/icon/icon-chain.png');
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
    background: url('../../../assets/image/icon/icon-chain.png');
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
.list-wrapper{
  width: calc(100% - 20px);
  margin: 5px auto;
  background:rgba(255,255,255,1);
  border-radius:5px;
  box-sizing: border-box;
}
</style>
