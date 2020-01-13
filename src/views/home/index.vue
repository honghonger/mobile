<template>
  <div class="home">
    <!-- 导航栏组件 -->
    <van-nav-bar title="首页" fixed />
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
        :finished="channel.finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
            v-for="article in channel.articles"
            :key="article.art_id.toString()"
            :title="article.title"
        />
      </van-list>
      </van-pull-refresh>
          <!-- 把需要下拉刷新的内容放到下拉刷新里面 -->
      </van-tab>
      <!-- 面包图标 使用vant插槽 -->
    <div class="wap-nav" slot="nav-right" @click="ischannelshow=true">
      <van-icon name="wap-nav" />
    </div>
      <!-- 面包图标 使用vant插槽 -->
    </van-tabs>
      <!-- 频道列表，标签页 -->
      <!-- 频道弹出层模块 -->
    <van-popup
      v-model="ischannelshow"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '95%' }"
      @open='onAllchannels'
    >
    <!-- 我的频道管理 -->
    <div class="channel-edit">
    <van-cell title="我的频道">
      <van-button
      type="danger"
      size="mini"
      @click="isEdit=!isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
        <van-grid :gutter="10">
        <van-grid-item
          v-for="channel in channels"
          :key="channel.id"
          :text="channel.name"
        >
        <van-icon name="close" slot="icon" size="15" v-show="isEdit"/>
        </van-grid-item>
      </van-grid>
    <!-- 我的频道管理 -->
    <!-- 推荐频道管理--复制 -->
    <van-cell title="推荐频道">
    </van-cell>
      <van-grid :gutter="10" :square="true">
        <van-grid-item
           v-for="channel in recommendChannels"
          :key="channel.id"
          :text="channel.name"
          @click="onChannelAdd(channel)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道管理--复制 -->
    </van-popup>
      <!-- 频道弹出层模块 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import { getArticles } from '@/api/article'
import { getAllChannels } from '@/api/channel'
export default {
  name: 'HomePage',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      channels: [],
      ischannelshow: true, // 频道弹框
      allChannels: [], // 全部频道列表
      isEdit: false
    }
  },
  created () {
    this.loadUserChannels()
  },
  // 在计算属性中对推荐列表进行处理
  computed: {
    recommendChannels () {
      // 先声明一个空数组
      const arr = []
      this.allChannels.forEach(channel => {
      // 每遍历一次就去我的频道里找有没有遍历的channel的数据
        const ret = this.channels.find(item => {
          return item.id === channel.id
        })
        // 如果没有就往arr中push一下，就会得到推荐的列表
        if (!ret) {
          arr.push(channel)
        }
      })
      return arr
    }
  },
  methods: {
    async onLoad () {
      // 获取当前频道
      const articleChannel = this.channels[this.active]
      //   获取当前频道列表
      const articles = articleChannel.articles
      // 请求数据
      const res = await getArticles({
        channel_id: articleChannel.id,
        timestamp: articleChannel.timestamp || Date.now(),
        with_top: 1
      })
      //   将数据添加到数据列表中
      articles.push(...res.data.data.results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      const pretimestamp = res.data.data.pre_timestamp
      if (pretimestamp) {
        articleChannel.timestamp = pretimestamp
      } else {
        articleChannel.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      // 获取当前频道
      const articleChannel = this.channels[this.active]
      //   获取当前频道列表
      const articles = articleChannel.articles
      // 1下拉刷新去请求数据
      const res = await getArticles({
        channel_id: articleChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 2请求成功之后加在文章列表的顶部
      articleChannel.articles.unshift(...res.data.data.results)
      //   关闭loading
      this.isLoading = false
      // 3提示用户刷新了几条数据
      const message = articles.length
        ? `更新了${articles.length}条数据`
        : '暂无数据更新'
      this.$toast(message)
    },

    // 请求频道列表
    async loadUserChannels () {
      const res = await getUserChannels()
      //   为每个频道添加一个文章列表，利用循环
      const channels = res.data.data.channels
      channels.forEach(channel => {
        channel.articles = []// 频道文章列表
        channel.finished = false// 结束状态
        channel.timestamp = null
      })
      this.channels = channels
    },

    // 全部频道列表
    async onAllchannels () {
      const res = await getAllChannels()
      this.allChannels = res.data.data.channels
    },

    onChannelAdd (channel) {
      this.channels.push(channel)
    }
  }
}
</script>

<style lang="less" scoped>
//给首页和频道固定定位、用到跟组件样式
 .home{
   //频道的根节点（右键审查元素得到）
   .van-tabs{
     //深度作用域子元素频道
     /deep/ .van-tabs__wrap{
       position: fixed;
       top: 46px;
       left: 0;
       right: 0;
       z-index: 2
    }
     //在深度到内容元素，距离首页和频道栏90px
     /deep/ .van-tabs__content{
       margin-top: 90px;
    }
    .wap-nav{
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
    }
  }
  .channel-edit{
      padding-top: 30px;
    }
  /deep/ .van-grid-item__icon-wrapper{
    position: absolute;
    top: -9px;
    right: -5px;
  }
 }
</style>
