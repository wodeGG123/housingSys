<template>
	<view-box class="wrap">
    <div class="title">
      <span>添加整改通知单</span>
      <img :src="require('../../../../../assets/image/icon/icon-add.png')" alt="" @click="addRe">
    </div>
    <div class="content">

    <div class="type">

      <popup-picker title="整改通知类型选择"  :data="listType" v-model="typeVal" value-text-align="right"  @on-change="onChange" ></popup-picker>

    </div>
       <div class="re-top" v-for="(item, index) in listContent" :key="index" @click="listItem(item.id)">
           <p>检查日期:{{item.createTime}}</p>
           <p>检查人:{{item.rummage}}</p>
           <div>状态:   <span class="status" v-if="item.status==1 ">已整改</span>
           <span class="status status-a" v-else>未整改</span>
           </div>
           <p>签发人:{{item.signer}}</p>
           <p>更新日期:{{item.lastTime}}</p>
           <div class="btn">
               <p class="edit" @click.stop="$router.push({name: 'updateRe', params: { id: item.id }})">
                 <img :src="require('../../../../../assets/image/icon/icon-edit.png')" alt="">
                 修改

                 </p>
                 <p class="edit" @click.stop="replyShow = true">
                 <img :src="require('../../../../../assets/image/icon/icon-edit.png')" alt="">
                 回复

                 </p>
               <p class="del" @click.stop="delItem(item.id)">
                  <img :src="require('../../../../../assets/image/icon/icon-del.png')" alt="">
                 删除
                 </p>
           </div>
       </div>
 </div>
    <toast v-model="showMsg" type="text">{{msg}}</toast>
	<div v-transfer-dom>
       <confirm v-model="replyShow"
      show-input
      ref="confirm5"
      :title="'回复'"
      @on-cancel="onReplyCancel"
      @on-confirm="onReplyConfirm"
      @on-show="onReplyShow"
      @on-hide="onReplyHide">
      </confirm>
    </div>
  </view-box>

</template>

<script>
import { PopupPicker, Group, XSwitch, Toast } from 'vux'
import {getTypeList, getList, deleteRectification} from '@/api/project/government'
export default {
  // props: {
  //   details: Object
  // },
  data () {
    return {
      list: [],
      typeVal: ['所有'],
      listType: [],
      listTypeId: [],
      listInspect: [],
      value: '0',
      listContent: [],
      typeId: '',
      showMsg: false,
      replyShow: false
    }
  },
  components: {
    PopupPicker,
    Group,
    XSwitch,
    Toast
  },
  created () {
    console.log('id', this.$route.params.id)
    this.$nextTick(() => {
      this.list.push('所有')
      getTypeList().then(res => {
        res.data.data.forEach(item => {
          this.list.push(item.name)
          this.listTypeId.push({
            name: item.name,
            id: item.id
          })
          this.listTypeId.push({name: '所有', id: ''})
        })
      })
    })
    this.listType.push(this.list)
    this.getList()
  },
  methods: {
    addRe () {
      this.$router.push({path: '/government/addRectificate/' + this.$route.params.id})
    },
    onChange (val) {
      for (var i in this.listTypeId) {
        if (this.listTypeId[i].name === val.join(']')) {
          this.typeId = this.listTypeId[i].id
        }
      }
      this.getList(this.typeId)
    },
    getList (typeId) {
      getList({'typeId': typeId}).then(res => {
        this.listContent = res.data.data
      })
    },
    listItem (id) {
      this.$router.push({ name: 'governmentProjectdetailsRe', params: { id: id } })
    },
    delItem (id) {
      let obj = []
      obj.push(id)
      deleteRectification({'ids': obj}).then(res => {
        this.showMsg = true
        this.msg = res.data.message
        if (res.data.result) {
          this.listContent.splice(this.listContent.findIndex(item => item.id === id), 1)
        }
      })
    },
    onReplyCancel () {},
    onReplyConfirm () {},
    onReplyShow () {},
    onReplyHide () {}
  }

}
</script>
<style lang="less" scoped>
.wrap{
  padding: 10px;
}
.title{

height:60px;
background:rgba(255,255,255,1);
border-radius:5px;
line-height: 60px;
padding-left: 10px;
position: relative;
text-align: left;
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
      width: 20px;
      vertical-align: middle;
      position: relative;
      top: 20px;
      left: -22px;
      float: right;
    }
    span{
      vertical-align: middle;
      margin-left: 4px;
      color: #3EB4FA;
      font-weight: bold;
    }
  }
  .content{
    background:rgba(255,255,255,1);
border-radius:5px;
padding: 10px;
margin-top: 8px;
.type{
  /deep/ .vux-cell-value{
      color: #F1BA27;
      font-weight: bold;
  }
  /deep/ .weui-cell{
    padding: 12px 0;
    border-bottom: 1px solid #F5F5F5;
  }
}
.re-top{
  padding: 10px 0;
  color: #999;
  line-height: 24px;
  border-bottom: 1px dashed #3EB1F9;
  position: relative;
  &:last-child{
    border-bottom: none;
  }
  .btn{
    position: absolute;
    right: 10px;
    bottom: 20px;

    .edit{
      color: #15C98C;

    }
    .del{
      color: #E34627;
      margin-top: 6px;
    }
    img{
        width: 12px;
      }
  }
}
  }
  .status{
    padding: 3px 6px;
    background-color: #15C98C;
    color: #fff;
    border-radius: 3px;
    font-size: 12px;
  }
  .status-a{

    background-color: #C64025;

  }
</style>
