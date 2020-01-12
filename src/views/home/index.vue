<template>
  <div class="home">
       <!-- 导航栏组件 -->
      <van-nav-bar title="首页"/>
      <!-- 频道列表，标签页 -->
      <van-tabs v-model="active">
          <!-- 绑定列表数据for循环 -->
        <van-tab
            :title="channel.name"
            v-for="channel in channels"
            :key="channel.id"
            >
            <!-- 把需要下拉刷新的内容放到下拉刷新里面 -->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <van-cell
                        v-for="item in list"
                        :key="item"
                        :title="item"
                    />
                </van-list>
            </van-pull-refresh>
            <!-- 把需要下拉刷新的内容放到下拉刷新里面 -->
        </van-tab>
      </van-tabs>
      <!-- 频道列表，标签页 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: []
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 2000)
    },
    // 请求频道列表
    async loadUserChannels () {
      const res = await getUserChannels()
      this.channels = res.data.data.channels
    }
  }
}
</script>

<style>

</style>
