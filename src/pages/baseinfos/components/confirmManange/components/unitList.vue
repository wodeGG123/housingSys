<template>
  <div>
    <div class="title">
      <span>公司列表</span>
      <span class="add-icon" 
        @click="$router.push('/baseinfos/confirmManange/add')">
        <svg-icon icon-class="add"></svg-icon>
      </span>
    </div>
    <scroll class="wrapper" :data="unitList">
      <div>
        <div class="list-wrapper">
          <v-touch class="list-item" v-if="unitList.length > 0"
            :class="{'will-delete-item': showDeleteIndexArr.indexOf(index) > -1}"
            v-for="(item, index) of unitList" :key="item.id"
            v-on:swipeleft="showDelete(index)" 
            v-on:swiperight="cancelDelete(index)"
            v-on:tap="$router.push({ name: 'confirmManangeEdit', params: { id: item.id } })">
            <div class="info">
              <p class="info-item-title">
                <svg-icon icon-class="unit"></svg-icon>
                <b>{{item.name}}</b>
              </p>
              <p>单位类型: {{item.type|typeFilter}}</p>
              <p>联系人：{{item.principal}}</p>
              <p>联系电话： <span class="blue">{{item.phone}}</span></p>
            </div>
            <div class="operate red" @click.stop="handleDelete(item.id)"
              v-if="showDeleteIndexArr.indexOf(index) > -1">
              <svg-icon icon-class="delete"/>
            </div>
          </v-touch>
          <div class="no-list-item" v-if="unitList.length === 0">暂无相关数据！</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
import { getUnitList, deleteUnit } from '@/api/baseinfos/unit'
export default {
  components: { scroll },
  props: {
    listQuery: Object
  },
  data () {
    return {
      unitList: [],
      showDeleteIndexArr: []
    }
  },
  mounted () {
    this.getUnitList(this.listQuery)
  },
  filters: {
    typeFilter (val) {
      const obj = {
        0: '建设',
        1: '施工',
        2: '监理',
        3: '勘察',
        4: '设计'
      }
      return obj[val]
    }
  },
  methods: {
    getUnitList (listQuery) {
      console.log(listQuery)
      getUnitList(listQuery).then(res => {
        const data = res.data
        console.log(data)
        if (data.result) {
          this.unitList = data.data
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
      const obj = {
        'ids[]': id
      } 
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          deleteUnit(obj).then(res => {
            const data = res.data
            if (data.result) {
              _this.$vux.confirm.hide()
              _this.$vux.alert.show({
                title: '删除成功'
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
                _this.getUnitList()
              }, 1000)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped >
.info p {
  padding-left: 1.1rem
}
.info p.info-item-title{
  padding-left: 0
}
</style>