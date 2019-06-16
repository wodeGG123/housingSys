<template>
  <div class="wrap">
    <div class="addRe">
      <div class="title">
        通知单基本信息
      </div>
      <div class="content">
        <x-input class="input" title="检查人" v-model="rectification.rummage" name="rummage" placeholder="请输入检查人"></x-input>
        <x-input class="input" title="签发人" v-model="rectification.signer" name="signer" placeholder="请输入签发人"></x-input>
        <div class="remark">
          <span>备注</span>
          <x-textarea v-model="rectification.remark" :height="130" placeholder="请输入备注"></x-textarea>
        </div>
          <div class="date">
          <datetime
          v-model="date"
          @on-change="changeDate"
          title="选择日期" @on-hide="log('hide', $event)"
          @on-confirm="onConfirm"></datetime>
      </div>
          <p class="notice">
        现责令整改，于{{date.split('-')[0]}}  年{{date.split('-')[1]}}  月{{date.split('-')[2]}}  日前将存在问题整改完毕，整改完毕后，由责任单位向桐梓县建设工程施工管理站报送《建设工程整改完成报告》。
        </p>
      </div>

      <div class="title">
        整改通知类型
      </div>
      <div class="content">
          <div>
            <popup-picker title="整改通知类型"  :data="listType" v-model="typeVal" value-text-align="right"  @on-change="onChange" ></popup-picker>
          </div>
          <div class="inspect" :key="index" v-for="(item, index) in listInspect">
          <x-switch :title="item.name" :data-content="items[index].content" :data-id="item.id" :value-map="[1, 0]" v-model="items[index].content"></x-switch>
          </div>
      </div>

      <div class="title">
        图片上传
      </div>
      <div class="content">
        <div class="add-img">
          <img src="../../../assets/image/icon_img.png" alt="上传图片">
          <form class="abs" id="formAlbum" onsubmit="return false" method="post" enctype="multipart/form-data">
            <input type="file" multiple id="addImg" name="file" @change="uploadImg()">
          </form>

        </div>
        <!--      上传的图片列表-->
        <div class="imgList-wrap">
 <div class="imgList" v-for="(item, index) in addImages" :key="index">
          <img class="imgItem" :src="item.src" alt="">
          <span @click="delImg(index,addImages)">
            <img  src="../../../assets/image/icon_delImg.png" alt="">
          </span>
        </div>
        </div>

      </div>
       <div class="btn" @click="btn">提交</div>
    </div>
<!--    <div v-transfer-dom>-->
<!--      <confirm-->
<!--        v-model="showValue"-->
<!--        :show-cancel-button="false"-->
<!--        title=""-->
<!--        @on-confirm="onConfirm">-->
<!--        <p style="text-align:center;">{{ addText }}</p>-->
<!--      </confirm>-->
<!--    </div>-->
    <toast v-model="showMsg" type="text">{{msg}}</toast>
  </div>
</template>

<script>
import { PopupPicker, Group, XSwitch, XInput, XTextarea, Datetime, Confirm, TransferDomDirective as TransferDom, Toast } from 'vux'
import {getTypeList, getSelectByType, addRectification} from '@/api/project/government'
import axios from 'axios'
export default {
  name: 'addRectificate',
  directives: {
    TransferDom
  },
  data () {
    return {
      typeVal: ['请选择类型'],
      list: [],
      listType: [],
      listInspect: [],
      listTypeId: [],
      claim: '',
      addImages: [],
      rectification: {
        projectId: '',
        typeId: '',
        rummage: '',
        signer: '',
        remark: '',
        claimDate: ''
      },
      date: '',
      items: [],
      ids: [],
      // addText:'',
      // showValue:false,
      // position:'default',
      showMsg: false,
      msg: ''
    }
  },
  components: {
    PopupPicker,
    Group,
    XSwitch,
    XInput,
    XTextarea,
    Datetime,
    Confirm,
    Toast
  },
  created () {
    this.rectification.projectId = this.$route.params.id
    console.log('id1', this.rectification.projectId)
    getTypeList().then(res => {
      res.data.data.forEach(item => {
        this.list.push(item.name)
        this.listTypeId.push({
          name: item.name,
          id: item.id
        })
      })
    })
    this.listType.push(this.list)
  },
  methods: {
    showPositionValue (position) {
      this.position = position
      this.showPositionValue = true
    },
    changeDate (val) {
      this.date = val
      console.log('date', val.split('-'))
    },
    onConfirm () {

    },
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    onChange (val) {
      for (var i in this.listTypeId) {
        if (this.listTypeId[i].name === val.join(']')) {
          this.rectification.typeId = this.listTypeId[i].id
        }
      }
      getSelectByType({'typeId': this.rectification.typeId}).then(res => {
        this.listInspect = res.data.data
        this.listInspect.forEach(item => {
          this.items.push({
            itemId: item.id,
            content: 1
          })
        })
      })
    },
    btn () {
      this.rectification.claimDate = this.date
      const obj = {
        rectification: this.rectification,
        items: this.items,
        ids: this.ids
      }
      addRectification(obj).then(res => {
        this.showMsg = true
        this.msg = res.data.message
        if (res.data.result) {
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000).bind(this)
        }
      })
    },
    uploadImg () {
      let that = this
      let files = document.getElementById('addImg').files
      var length = files.length
      if (length <= 1) {
        that.compress(files[0])
      } else {
        for (var i in files) {
          if (i < files.length) {
            that.compress(files[i])
          }
        }
      }
    },
    compress (item) {
      let that = this
      var formData = new FormData()
      formData.append('file', item)
      formData.append('objType', 'rectification')
      formData.append('objId', that.rectification.projectId)
      axios.post('http://test.tzzj.zxytinfo.com/file/upload', formData, {
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(function (res) {
        that.addImages.push({src: res.data.ext.filepath, id: res.data.ext.id})
        that.ids.push(res.data.ext.id)
      })
      // var that = this
      // that.lrz(item, { width: 480 }).then(function (result) {
      //  var img = new Image()
      //  img.src = result.base64
      //  return result
      // }).then(function (result) {
      //   console.log('yulan', result,id)
      // 项目$route.params.id
      // var formData = new FormData()
      // formData.append('file', result.base64)
      // formData.append('objType', 'rectification')
      // formData.append('objId', 1)
      // axios.post('http://test.tzzj.zxytinfo.com/file/upload',formData,{
      //   method: 'post',
      //   headers: {'Content-Type': 'multipart/form-data'}
      // }).then(function (res) {
      //   console.log(res.data)
      // })
      // var xhr = XMLHttpRequest()
      //  // var dataImg={
      //  //   objType:'rectification',
      //  //   objId:id
      //  // }
      // xhr.open('post', 'http://test.tzzj.zxytinfo.com/file/upload')
      // xhr.onload = function (data) {
      //   console.log('filedata', data)
      //  if (xhr.status === 200) {
      //   // 上传成功
      //   console.log('data', data)
      //   var newData = JSON.parse(data)
      //   images.push(newData.data)
      //  } else {
      //   // 其它情况
      //  }
      // }
      // // 添加参数
      // result.formData.append('fileLen', result.fileLen)
      // result.formData.append('objType', 'rectification')
      //  result.formData.append('objId', id)
      // // 触发上传
      // xhr.send(result.formData)
      // return result
      // var form = new FormData()
      // form.append('img', result.base64)
      // console.log('2222', result)
      // })
    },
    delImg (index, idImages) {
      idImages.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  background: #F5F5F5;
  .title{
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
  }
  .content{
    background-color: #fff;
    /deep/.weui-cell:before{
      left: 0;
    }
    .remark{
      display: flex;
      height: 150px;
      padding: 15px;
      border-top: 1px solid #D9D9D9;
      span{
        width: 105px;
      }
      /deep/.vux-x-textarea.weui-cell{
        padding: 0px;
        &::before{
          display: none;
        }
      }
    }
    .date,.notice{
      border-top: 1px solid #D9D9D9;
    }
    .notice{
      padding: 15px;
    }
      /deep/ .weui-label{
        font-size: 12px;
        width: 105px!important;
      }
      .inspect{
        border-top: 1px dotted #D9D9D9;
      }
      .add-img{
        padding: 15px;
        position: relative;
        img{
              width: 30px;
    padding: 20px;
    border: 1px solid #eee;
        }
        form{
          position: absolute;
          left: 15px;
          top: 15px;
        }
        input{
          width: 72px;
          height: 72px;
          opacity: 0;
        }
      }
      .imgList-wrap{
        display: flex;
        padding: 15px;
        .imgList{
          position: relative;
          margin-right: 16px;
          margin-bottom: 10px;
          width: 72px;
          height: 72px;
          border: 1px solid #eee;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #eee;
          img{
            max-height: 64px;
            max-width: 64px;
          }
          span{
            position: absolute;
            right: -10px;
            top: -10px;
            img{
              width: 20px;
            }
          }
        }
      }
  }
  .btn{
    width:calc(100% - 20px)!important;
    height:50px;
    background:linear-gradient(90deg,rgba(62,180,250,1),rgba(59,13,217,1));
    border-radius:5px;
    color: #fff;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    margin: 20px auto;
  }
}
</style>
