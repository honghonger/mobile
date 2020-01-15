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
       <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- 搜索框 -->
    <!-- 联想建议表格 -->
    <van-cell-group>
        <van-cell
        :title="item"
        icon="search"
        v-for="item in searchs"
        :key="item"
        />
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

export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '', // 用户输入的文本
      searchs: []// 联想数据列表
    }
  },
  methods: {
    onSearch () {},

    async onSearchIpunt () {
      // 非空校验
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSearch(this.searchText)
      //   console.log(res)
      this.searchs = res.data.data.options
    }
  }
}
</script>

<style>

</style>
