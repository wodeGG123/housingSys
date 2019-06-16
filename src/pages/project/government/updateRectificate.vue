<template>
  <div class="wrap">
  <div class="addRe">
    <div class="title">
      <span>通知单基本信息</span>
    </div>
    <div class="content">
    <x-input class="input" title="检查人" v-model="rummage" name="rummage" placeholder="请输入检查人"></x-input>
    <x-input class="input" title="签发人" v-model="signer" name="signer" placeholder="请输入签发人"></x-input>
    <x-input class="input" title="备注" v-model="remark" name="remark" placeholder="请输入备注"></x-input>
    <div class="remark">
      <span>整改意见</span>
      <x-textarea v-model="claim" :height="130" placeholder="请输入整改通知">
      </x-textarea>
    </div>

    </div>
    <div class="title">
      整改通知类型
    </div>
    <div class="content">
      <div>
        <popup-picker title="整改通知类型"  :data="listType" v-model="typeVal" value-text-align="right"  @on-change="onChange" ></popup-picker>
      </div>
      <div class="inspect" v-for="(item, index) in listInspect" :key="index">
      <x-switch :title="item.name" :value-map="['0', '1']" v-model="item.id"></x-switch>
    </div>
    </div>

    <div class="title">
      图片上传
    </div>
    <div class="content">
      <div class="add-img">
        <img src="../../../assets/image/icon_img.png" alt="上传图片">
        <form class="abs" id="formAlbum" onsubmit="return false" method="post" enctype="multipart/form-data">
          <input type="file" hidden multiple id="addImg" name="file" @change="uploadImg(addImages)">
        </form>

      </div>
      <!--      上传的图片列表-->
      <!--             <img src="../../../assets/image/icon_img.png" alt="上传图片">-->
      <div class="imgList-wrap">
  <div class="imgList" v-for="(item, index) in addImages" :key="index">
        <img class="imgItem" :src="item" alt="">
        <span @click="delImg(index,addImages)">
            <img  src="../../../assets/image/icon_delImg.png" alt="">
          </span>
      </div>
      </div>

    </div>

    <div class="btn" @click="btn">提交</div>
  </div>
  </div>
</template>

<script>
import { PopupPicker, Group, XSwitch, XInput, XTextarea } from 'vux'
import {getTypeList, getSelectByType, addRectification, getSelectById} from '@/api/project/government'

export default {
  name: 'addRectificate',
  data () {
    return {
      typeVal: ['请选择类型'],
      list: [],
      listType: [],
      listInspect: [],
      typeId: '',
      listTypeId: [],
      rummage: '',
      signer: '',
      remark: '',
      claim: '',
      addImages: []

    }
  },
  components: {
    PopupPicker,
    Group,
    XSwitch,
    XInput,
    XTextarea
  },
  created () {
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
    getSelectById({id: this.$route.params.id}).then(res => {
      this.rummage = res.data.data.rummage
      this.signer = res.data.data.signer
      this.remark = res.data.data.remark
      this.claim = res.data.data.claim
      console.log('de', res.data.data)
    })
  },
  methods: {
    onChange (val) {
      for (var i in this.listTypeId) {
        if (this.listTypeId[i].name === val.join(']')) {
          this.typeId = this.listTypeId[i].id
        }
      }
      getSelectByType({'typeId': this.typeId}).then(res => {
        this.listInspect = res.data.data
      })
    },
    btn () {
      console.log('claim', this.rummage, this.signer, this.remark, this.claim, this.typeId)
      addRectification({}).then(res => {

      })
    },
    uploadImg (idImages) {
      let that = this
      let files = document.getElementById('addImg').files
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      // 发起异步请求
      reader.onload = function () {
        // 读取完成后，将结果赋值给img的src
        that.addImages.push(this.result)
      }
      // var length = files.length
      // if (length <= 1) {
      //   that.compress(files[0], idImages)
      // } else {
      //   for (var i in files) {
      //     if (i < files.length) {
      //       that.compress(files[i], idImages)
      //     }
      //   }
      // }
    },
    // compress (item, images) {
    //
    // },
    delImg (index, idImages) {
      idImages.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  background: #F5F5F5;
  padding-bottom: 20px;
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
    margin: 20px auto 0;
  }

}
</style>
