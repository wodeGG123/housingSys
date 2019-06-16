<template>
  <div class="container">
    <child :specificVideo="specificVideo"></child>
  </div>
</template>
<script>
import child from '@/components/video'
export default {
  name: 'app',
  components: {
    child
  },
  data() {
    return {
      // specificVideo: null,
      videoList: [
        { desc: '门口', shebeiCode: '1000005', entrayNum: 0, address: 'http://117.187.96.174:7086/live/cameraid/1000005%240/substream/1.m3u8', name: '门口监控视频' },
        { desc: '进出口2', shebeiCode: '1000005', entrayNum: 1, address: 'http://117.187.96.174:7086/live/cameraid/1000005%241/substream/1.m3u8', name: '进出口2监控视频' },
        { desc: '物料通道', shebeiCode: '1000005', entrayNum: 2, address: 'http://117.187.96.174:7086/live/cameraid/1000005%242/substream/1.m3u8', name: '物料通道监控视频' },
        { desc: '塔吊', shebeiCode: '1000005', entrayNum: 3, address: 'http://117.187.96.174:7086/live/cameraid/1000005%243/substream/1.m3u8', name: '塔吊监控视频' },
        { desc: '塔吊', shebeiCode: '1000005', entrayNum: 5, address: 'http://117.187.96.174:7086/live/cameraid/1000005%245/substream/1.m3u8', name: '塔吊监控视频' },
      ]
    }
  },
  computed: {
    specificVideo () {
      return this.videoList.filter(item => item.entrayNum === this.$route.params.id)[0]
    }
  }
}
</script>

<style scoped>
  .container{
    margin-top: 1rem
  } 
</style>
