<template>
  <view-box>
    <div class="list-wrapper">
      <div class="title">
       <span>用户列表</span>
       <span class="add-icon" 
         @click="$router.push('/baseinfos/userManange/userinfo/add')">
         <svg-icon icon-class="add"></svg-icon>
       </span>
       </div>
      <div class="list-item" v-for="(item, index) of userList" 
        :key="index" @click="$router.push('/baseinfos/userManange/userinfo/edit')">
        <div class="left-img">
          <img :src="item.avator" alt="">
        </div>
        <div class="info">
          <p>姓名： {{item.name}}</p>
          <p>性别： {{item.gender}}</p>
          <p>生日： {{item.birthday}}</p>
        </div>
        <div class="operate">
          <!-- <span @click="$router.push('/baseinfos/userManange/userinfo/edit')">编辑</span> -->
          <span @click="handleDelete">删除</span>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import userImg from '@/assets/image/test-img1.png'
export default {
  data () {
    return {
      userImg,
      userList: [
        { name: '王明', gender: '女', birthday: '1996-09-23', avator:  userImg },
        { name: '吴欢', gender: '女', birthday: '1996-03-10', avator:  userImg },
        { name: '柳林', gender: '男', birthday: '1986-02-13', avator:  userImg },
        { name: '周海', gender: '男', birthday: '1990-01-03', avator:  userImg },
        { name: '李晓', gender: '女', birthday: '1992-04-06', avator:  userImg }
      ]
    }
  },
  methods: {
    handleDelete () {
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          _this.$vux.loading.show({
            text: '删除中...'
          })
          setTimeout(() => {
            _this.$vux.loading.hide()
            _this.$nextTick(() => {
              _this.$vux.confirm.hide()
            })
          }, 300)
        }
      })
    }
  }
}
</script>
