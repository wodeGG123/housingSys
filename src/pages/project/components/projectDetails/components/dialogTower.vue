<template>
  <div v-transfer-dom>
    <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
     <p class="title">
				<img :src="require('../../../../../assets/image/icon/icon-tower.png')" alt="">
			塔吊信息 {{title}}
				</p>
				<div class="content">
					<p>
						<span>司机姓名: {{temp.driverID}}</span>
					</p>
					<p>
						<span>司机身份证号：{{temp.iDCard}}</span>
					</p>
					<p>
						<span>吊重: {{temp.load}}</span>
						<span>幅度(米)：{{temp.radius}}</span>
					</p>
					<p>
						<span>力矩百分比: {{temp.percent}}</span>
						<span>回转角度：{{temp.angle}}</span>
					</p>
					<p>
						<span>高度（米）: {{temp.height}}</span>
						<span>风速(米/秒)：{{temp.windSpeed}}</span>
					</p>
					<p>
						<span>安全吊重: {{temp.safeLoad}}</span>
						<span>倍率：{{temp.fall}}</span>
					</p>
					<p>
						<span>倾斜方向: {{temp.obliqueDirection}}</span>
						<span>倾斜状态：{{temp.obliqueState}}</span>
					</p>
					<p>
						<span>倾斜角度: {{temp.obliqueAngle}}</span>
						<span>设备是否在线：{{temp.isOnline|onlineFilter}}</span>
					</p>
				</div>
				<div @click="showHideOnBlur=false" class="close">
					<span class="vux-close"></span>
				</div>
			</x-dialog>
		</div>
</template>

<script>
export default {
  props: {
    showHideOnBlur: Boolean,
    temp: Object,
    title: String
  },
  filters: {
    onlineFilter (val) {
      const obj = {
        0: '不在线',
        1: '在线'
      }
      return obj[val]
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-demo {
    position: relative;
    width: 15rem;
    // padding: .5rem;
    /deep/ .weui-dialog {
        background-color: transparent;
    }
}
.title {
    height: 50px;
    background-color: #fff;
    border-radius: 5px;
    font-weight: bold;
    color: #3EB4FA;
    vertical-align: middle;
    text-align: left;
    padding-left: 10px;
    line-height: 50px;
    position: relative;
    &::before {
        background: url('../../../../../assets/image/icon/icon-chain.png');
        content:'';
        display: block;
        width: 10px;
        height: 31px;
        background-size: 100% 100%;
        position: absolute;
        left: 20px;
        bottom: -20px;
    }
    &::after {
        background: url('../../../../../assets/image/icon/icon-chain.png');
        content:'';
        display: block;
        width: 10px;
        height: 31px;
        background-size: 100% 100%;
        position: absolute;
        right: 20px;
        bottom: -20px;
    }
    img {
        width: 18px;
        vertical-align: middle;
        margin-right: 6px;
    }
}
.content{
  background-color: #fff;
	border-radius: 5px;
	margin-top: 8px;
	padding: 20px 10px;
  p{
		display: flex;
		text-align: left;
		line-height: 24px;
		color: #999;
		span{
			flex:1;
		}
	}
}
</style>
