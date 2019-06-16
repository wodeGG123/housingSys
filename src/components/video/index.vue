<template>
  <div class="container">
    <p v-if="specificVideo.name">{{specificVideo.name}}</p>
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
       ref="videoPlayer"
       :playsinline="true"
       :options="playerOptions"
       @play="onPlayerPlay($event)"
       @pause="onPlayerPause($event)"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
export default {
  props: {
    specificVideo: Object
  },
  data () {
    return {
      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        controls: true,
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "application/x-mpegURL",
          src: 'http://117.187.96.174:7086/live/cameraid/1000005%241/substream/1.m3u8' //你的m3u8地址（必填）
        }],
        poster: '../assets/image/test-banner.jpg.', //你的封面地址
        width: document.documentElement.clientWidth,
        height: 450,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
         timeDivider: true,
         durationDisplay: true,
         remainingTimeDisplay: false,
         fullscreenToggle: true  //全屏按钮
       }
      }
    }
  },
  components: {
    videoPlayer
  },
  mounted () {
    this.playerOptions.sources[0].src = this.specificVideo.address
  },
  methods: {
    onPlayerPlay(player) {
    },
    onPlayerPause(player){
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
  .container {
    margin-top: 5rem;
    background-color: #efefef;
    min-height: 100%;
  }
  .video-js .video-player{
    height: 20rem;
  }
</style>
