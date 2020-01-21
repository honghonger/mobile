<template>
  <div class="search">
      <!-- 搜索框 -->
    <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        @input="onSearchIpunt"
    >
    <!-- 把用户输入的内容传进来 -->
       <div slot="action" @click="onSearch(searchText)">搜索</div>
    </van-search>
    <!-- 搜索框 -->
    <!-- 联想建议表格 -->
    <van-cell-group>
        <van-cell
        icon="search"
        v-for="item in searchs"
        :key="item"
        @click="onSearch(item)"
        >
        <div slot="title" v-html="heightlight(item)"></div>
        </van-cell>
    </van-cell-group>
    <!-- 联想建议表格 -->
    <!-- 历史记录 -->
    <van-cell-group>
        <van-cell title="历史记录">
            <span>全部删除</span>&nbsp;&nbsp;
            <span>完成</span>
            <van-icon name="delete" size="mini"/>
        </van-cell>
        <van-cell title="单元格">
            <van-icon name="close" size="15"/>
        </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '', // 用户输入的文本
      searchs: [], // 联想数据列表
      serchHistories: getItem('search-history')// 放本地存储历史记录的数据
    }
  },
  methods: {
    onSearch (q) {
      // 非空判断
      if (!q.trim()) {
        return
      }
      const index = this.serchHistories.indexOf(q)
      if (index !== -1) {
        // 不要重复
        this.serchHistories.splice(index, 1)
      }
      // 添加到数组中
      this.serchHistories.unshift(q)
      // 在跳转之前将搜索的关键字记录到搜索历史中
      setItem('search-history', this.serchHistories)
      this.$router.push(`/search/${q}`)
    },

    async onSearchIpunt () {
      // 非空校验
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSearch(this.searchText)
      //   console.log(res)
      this.searchs = res.data.data.options
    },

    heightlight (str) {
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style>

</style>
