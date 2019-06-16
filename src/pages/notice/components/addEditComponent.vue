<template>
	<view-box>
    <group :title="tempStatus[type] + '公告'">
      <x-input title="标题" v-model="noticeDetails.title"></x-input>
		  <vue-html5-editor :content="noticeDetails.content"@change="updateContent"></vue-html5-editor>
    </group>
    <x-button class="add" type="primary" plain mini
      @click.native="handleAdd" v-if="type === 'add'">确认添加</x-button>
    <x-button class="add" type="primary" plain mini
      @click.native="handleEdit" v-if="type === 'edit'">确认修改</x-button>
	</view-box>
</template>

<script>
import { mapGetters } from 'vuex'
import { addNotice, updateNotice } from '@/api/notice'
export default {
	props: {
    temp: Object,
    type: String
	},
  data () {
  	return {
  		tempStatus: { 'add': '添加', 'edit': '修改' },
    }
  },
  computed: {
    ...mapGetters(['noticeDetails'])
  },
  methods: {
    updateContent(data) {
      this.noticeDetails.content = data
    },
  	handleAdd () {
  		addNotice(this.noticeDetails).then(res => {
  			console.log(res)
  			const _this = this
  			const data = res.data
  			if (data.result) {
          this.$vux.alert.show({
            title: '成功',
            content: '公告信息添加成功',
          })
          setTimeout(() => {
            _this.$vux.alert.hide()
            _this.$router.push('/notice/list')
          }, 1000)
        }
  		})
  	},
    handleEdit () {
      console.log(this.noticeDetails)
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认修改信息？',
        onConfirm: () => {
          updateNotice(this.noticeDetails).then(res => {
            console.log(res)
            const data = res.data
            if (data.result) {
              this.$vux.alert.show({
                title: '成功',
                content: '公告信息修改成功',
              })
              _this.$emit('getDetail')
            } else {
              this.$vux.alert.show({
                title: '失败',
                content: '公告信息修改失败',
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
              }, 1000)
            }
          })
        }
      })
    }
  }
}
</script>
