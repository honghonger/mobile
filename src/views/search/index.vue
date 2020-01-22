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
    <van-cell-group v-show="searchText">
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
    <van-cell-group v-show="!searchText">
        <van-cell title="历史记录">
          <!-- 3一开始的时候全部删除和完成是隐藏的 -->
            <div v-show="isDeleteShow">
              <span @click="serchHistories=[]">全部删除</span>&nbsp;&nbsp;
              <span @click="isDeleteShow=false">完成</span>
              <!-- 5当点击完成的时候就隐藏 -->
            </div>
            <van-icon
            name="delete"
            size="mini"
            v-show="!isDeleteShow"
            @click="isDeleteShow=true"
            />
            <!-- 4当点击删除按钮的时候，删除按钮隐藏所以=true -->
            <!-- 2删除那个小图标是显示的，所以取反 就是显示 -->
        </van-cell>
        <van-cell
          :title="item"
          v-for="(item,index) in serchHistories"
          :key="item">
        <van-icon
          name="close"
          size="15"
          v-show="isDeleteShow"
          @click.stop="serchHistories.splice(index,1)"
        />
        <!-- 1首先每个单元格右边的小x是隐藏的，所以默认就是false? -->
        </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: 'searchPage',
  data () {
    return {
      searchText: '', // 用户输入的文本
      searchs: [], // 联想数据列表
      serchHistories: getItem('search-history'), // 放本地存储历史记录的数据
      isDeleteShow: false// 控制历史记录删除的显示或隐藏
    }
  },
  watch: {
    serchHistories () {
      setItem('search-history', this.serchHistories)
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

    onSearchIpunt: debounce(async function () {
      // 非空校验
      const searchText = this.searchText.trim()
      if (!searchText) {
        return
      }
      const res = await getSearch(this.searchText)
      //   console.log(res)
      this.searchs = res.data.data.options
    }, 300),

    heightlight (str) {
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style>

</style>
