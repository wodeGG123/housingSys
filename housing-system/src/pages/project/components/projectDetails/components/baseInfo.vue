<template>
  <view-box class="base-info-wrapper">
    <ul class="info-top">
      <li><h5>项目名称：</h5><p>{{details.name}}</p></li>
      <li><h5>项目地址：</h5><p>{{details.address}}</p></li>
      <li><h5>项目督导员：</h5> <p>{{details.head}}</p></li>
      <li><h5>办公室电话：</h5><p>{{details.officePhone}}</p></li>
      <li><h5>移动电话：</h5><p>{{details.phone}}</p></li>
      <a href="http://tzzjm.zxytinfo.com/appTest/ht/example_sjzx.html">智能楼宇</a>
    </ul>

    <!-- 删除提示弹框 -->
    <div v-transfer-dom>
      <confirm v-model="isDeleteShow" :close-on-confirm="false"
        title='操作' @on-confirm="handleDelete">
        <p class="center">确定要删除此项目吗？</p>
      </confirm>
    </div>

    <ul class="department-info">
      <li>
        <div><h5>建设单位：</h5>
        <p>
          <span v-if="details.jiansheUnit">{{details.jiansheUnit.id|unitFilter(unitList)}}</span>
          <span v-else>无</span>
        </p>
        </div>
        <div><h5>项目负责人：</h5><p> {{details.jiansheManager|ManagerFilter(employeeList)}}</p></div>
        <!-- <div>联系电话： {{details.jiansheUnit.phone}}</div> -->
      </li>
      <li>
        <div><h5>施工单位：</h5>
        <p>
          <span v-if="details.shigongUnit">{{details.shigongUnit.id|unitFilter(unitList)}}</span>
          <span v-else>无</span>
        </p>
        </div>
        <div><h5>项目负责人：</h5><p> {{details.shigongManager|ManagerFilter(employeeList)}}</p></div>
        <!-- <div>联系电话： {{details.shigongUnit.phone}}</div> -->
      </li>
      <li>
        <div><h5>监理单位：</h5>
        <p>
          <span v-if="details.jianliUnit">{{details.jianliUnit.id|unitFilter(unitList)}}</span>
          <span v-else>无</span>
          </p>
        </div>
        <div><h5>项目负责人：</h5> <p>{{details.jianliManager|ManagerFilter(employeeList)}}</p></div>
        <!-- <div>联系电话： {{details.jianliUnit.phone}}</div> -->
      </li>
      <li>
        <div><h5>勘察单位：</h5>
        <p>
          <span v-if="details.kanchaUnit">{{details.kanchaUnit.id|unitFilter(unitList)}}</span>
          <span v-else>无</span>
          </p>
        </div>
        <div><h5>项目负责人：</h5> <p>{{details.kanchaManager|ManagerFilter(employeeList)}}</p></div>
        <!-- <div>联系电话： {{details.kanchaUnit.phone}}</div> -->
      </li>
      <li>
        <div><h5>设计单位：</h5>
        <p>
          <span v-if="details.shejiUnit">{{details.shejiUnit.id|unitFilter(unitList)}}</span>
          <span v-else>无</span>
          </p>
        </div>
        <div><h5>项目负责人：</h5> <p>{{details.shejiManager|ManagerFilter(employeeList)}}</p></div>
        <!-- <div>联系电话： {{details.shejiUnit.phobe}}</div> -->
      </li>
    </ul>
        <div class="btn-wrapper">
      <x-button class="edit-bt" type="primary" plain mini @click.native="$router.push({ name: 'governmentProjectEdit', params: { id: details.id }})">修改</x-button>
      <!-- <x-button type="warn" mini plain @click.native="showDelete(details.id)">删除</x-button> -->
    </div>
  </view-box>
</template>

<script>
import { getAllUnitList, getAllEmployeeList } from '@/constant'
export default {
  props: {
    details: Object
  },
  data () {
    return {
      isDeleteShow: false,
      deleteId: '',
      unitList: [],
      employeeList: []
    }
  },
  mounted () {
    this.getUnitList()
    this.getEmplpyeeList()
    console.log(this.details)
  },
  filters: {
    unitFilter (val, unitList) {
      return unitList.filter(item => item.id === val)[0].name
    },
    ManagerFilter (val, employeeList) {
      return employeeList.filter(item => item.id === val)[0].name
    }
  },
  methods: {
    getUnitList () {
      getAllUnitList().then(data => {
        this.unitList = data
      })
    },
    getEmplpyeeList () {
      getAllEmployeeList().then(data => {
        this.employeeList = data
      })
    },
    showDelete (id) {
      this.isDeleteShow = true
      this.deleteId = id
    },
    handleDelete () {
      this.$vux.loading.show({
        text: '删除中...'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.isDeleteShow = false
        this.$nextTick(() => {
          this.$router.push({ path: '/project' })
        })
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
  .base-info-wrapper{
    margin: 0 10px;
  }
  .info-top{
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-top: 10px;
    position: relative;
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
    z-index: 1;
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
    z-index: 1;
  }
    a{
      color: #3EB4FA;
    }
    li{
      display: flex;
      h5{
        flex:1;
        font-size: 14px;
        font-weight: normal;
      }
      p{
        flex: 2;
      }
    }
  }
  .info-top li {
    list-style: none;
    line-height: 2.5rem
  }
  .btn-wrapper {
    margin-top: 15px;
    width: 100%;
  }
  .btn-wrapper .weui-btn{
    width:100%;
    height:50px;
    background:linear-gradient(90deg,rgba(62,180,250,1),rgba(59,13,217,1));
    border-radius:5px;
    color: #fff;
    margin: 0 auto;
  }
  .department-info{

      li{
        background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    margin-top: 10px;
    position: relative;
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
    z-index: 1;
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
    z-index: 1;
  }

  &:last-child::after,&:last-child::before{
    display: none;
  }
       &>div{
      display: flex;
      h5{
        flex:1;
        font-size: 14px;
        font-weight: normal;
      }
      p{
        flex: 2;
      }
       }
      }
    }

</style>
