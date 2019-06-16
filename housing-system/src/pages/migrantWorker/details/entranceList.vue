<template>
  <view-box>
  	<group>
  		<datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm"  
  		 :hour-list="['09', '10', '11', '12', '13', '14', '15', '16']" 
  		 :minute-list="['00', '15', '30', '45']" 
  		 @on-change="change"></datetime>
    </group>
  	</group>
    <div class="list-wrapper">
      <div class="title">
        <span>
          门禁列表
        </span>
      </div>
      <v-touch class="list-item" v-for="(item, index) of guardList" :key="index" v-on:tap = "$router.push('./entranceDetails')">
        <div class="left-img">
          <img :src="userImg" alt="">
        </div>
        <div class="info">
          <p><b>{{item.name}}</b></p>
          <p>进： {{item.inNum}}人</p>
          <p>出： {{item.outNum}}人</p>
        </div>
      </v-touch>
    </div>
  </view-box>
</template>
<script>
import userImg from '@/assets/image/project-img.jpg'
export default {
  data() {
    return {
    	hourListValue: '2019-4-30 11:29:30',
      userImg,
      guardList: [
        { id: 0, name: '一号门', inNum: '140', outNum: '140' },
        { id: 1, name: '二号门', inNum: '30', outNum: '23' }
      ]
    }
  },
  methods: {
  	change () {

  	}
  }
}

</script>
