<!--<template>-->
<!--  <formBox :form="loginForm" :title="'登陆'">-->
<!--    <CellBox class="extra">-->
<!--      <span class="blue forget"  @click="$router.push('/forget')">忘记密码？</span>-->
<!--      <span class="gray">没有账号，立即注册</span>-->
<!--    </CellBox>-->
<!--  </formBox>-->
<!--</template>-->

<!--<script>-->
<!--import { CellBox } from 'vux'-->
<!--import formBox from './components/formBox'-->
<!--export default {-->
<!--  components: { CellBox, formBox },-->
<!--  data () {-->
<!--    return {-->
<!--      loginForm: {-->
<!--        username: 'admin',-->
<!--        password: 'admin'-->
<!--      },-->
<!--      showRegister: false-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.extra{-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  justify-content: space-between;-->
<!--  padding-top: 30px-->
<!--}-->
<!--</style>-->
<!--<template>-->
<!--  <div style="width: 100%;height:100%;">-->
<!--    <iframe src="/static/login/index.html" id="login" style="width: 100%;height: 100%;" frameborder="0"></iframe>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    name: 'video-player',-->
<!--    components: {},-->
<!--    data () {-->
<!--      return {}-->
<!--    },-->
<!--    mounted: function () {-->
<!--      // var childFrameObj = document.getElementById('login')-->
<!--      // childFrameObj.contentWindow.paramFromParent = this.$route.query-->
<!--    },-->
<!--    methods: {}-->
<!--  }-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--  #app{-->
<!--    /deep/main{-->
<!--      width: 100%;-->
<!--      height: 100%;-->
<!--    }-->
<!--  }-->

<!--</style>-->
<template>
  <div class="container demo-1">

    <div class="content">
      <div id="large-header" class="large-header">
        <div class="logo_box">
          <h3>桐梓县智慧城建</h3>

            <div class="input_outer">
              <span class="u_user"></span>
              <input name="logname" v-model="username" class="text" style="color: #FFFFFF !important" type="text" placeholder="请输入账户">
            </div>
            <div class="input_outer">
              <span class="us_uer"></span>
              <input name="logpass" v-model="password" class="text" style="color: #FFFFFF !important; position:absolute; z-index:100;"value="" type="password" placeholder="请输入密码">
            </div>
            <div class="mb2">
              <a class="act-but submit" href="javascript:;" style="color: #FFFFFF" @click="btn" >登录</a></div>
        </div>
      </div>
    </div>
    <toast v-model="showMsg" type="text">{{msg}}</toast>
  </div>

  </template>

  <script>
    import { XInput, Group, XButton, Toast } from 'vux'
    import { setUsername } from '@/utils/auth'
    import { login } from '@/api/login'
    export default {
      name: 'index',
      components: {Toast},
      data () {
        return {
          username:'',
          password:'',
          showMsg: false,
          msg: ''

        }
      },
      mounted: function () {

      },
      methods: {
        btn(){
          console.log('this',this.username,this.password)
          if (this.username === '' || this.password === '' || this.username === undefined || this.password === undefined) {
            this.showMsg = true
            this.msg = '账号或密码为空！'
          }else {
            login({username:this.username,password:this.password}).then(res=>{
              this.showMsg = true
              console.log('this',res)
              this.msg = res.data.message
                if(res.data.result){
                  let nameData={
                    name:res.data.data.name ,
                    roleCodes:res.data.data.roleCodes ,
                    username:res.data.data.username
                  }
                  setUsername(nameData)
                  // this.$router.push('/')
                  this.$router.push({ name: 'home'})
                }
            })
          }

        }
      }
    }
  </script>

  <style  scoped>
    @import './css/component.css';
    @import './css/demo.css';
    @import './css/normalize.css';
    .container,.content,.large-header{
      width: 100%;
      height: 100%;
      padding: 0;
    }
    #app{
      /deep/main{
        width: 100%;
        height: 100%;
      }
    }

  </style>
