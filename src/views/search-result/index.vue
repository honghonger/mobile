<template>
  <div>
       <!-- 导航栏组件 -->
      <van-nav-bar :title="title" left-arrow @click-left="$router.back()"/>
      <!-- 导航栏组件 -->
      <!-- 文章列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
            v-for="item in list"
            :key="item.art_id.toString()"
            :title="item.title"
        />
     </van-list>
      <!-- 文章列表 -->
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {
    title () {
      return `${this.$route.params.q}的搜索结果`
    }
  },
  methods: {
    async onLoad () {
      // 1请求获取数据
      const res = await getSearchResult({
        page: this.page, // 页数，不传默认为1
        per_page: 20, // 每页数量，不传每页数量由后端决定
        q: this.$route.params.q// 搜索关键词
      })
      //   console.log(res)
      // 2将数据添加到列表中
      const results = res.data.data.results
      this.list.push(...results)
      // 3关闭loading
      this.loading = false
      // 4判断是否还有数据，没有将Finnished改为true
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
