<template>
  <div class="search">
      <!-- 搜索框 -->
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
    >
       <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- 搜索框 -->
    <!-- 联想建议表格 -->
    <van-cell-group>
        <van-cell title="单元格"  icon="search"/>
        <van-cell title="单元格"  icon="search"/>
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
export default {
  name: 'searchPage',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {}
  }
}
</script>

<style>

</style>
