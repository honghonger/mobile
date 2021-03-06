<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading"/>
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate}}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="onfollow"
        >{{article.is_followed ? '取消关注' : '+关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button
        round
        size="small"
        hairline
        type="primary"
        plain icon="good-job-o"
        @click="onLike"
        >{{article.attitude === 1 ? '取消点赞' : '点赞' }}</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>网络超时，点击 <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。</p>
    </div>
    <!-- /加载失败的消息提示 -->
  </div>
</template>

<script>
import { getArticle, addLike, deleteLike } from '@/api/article'
import { following, unfollowing } from '@/api/user'

export default {
  name: 'articlaIndex',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {} // 文章详情
    }
  },

  created () {
    this.loadArticle()
  },

  methods: {
    async loadArticle () {
      // 开启loading
      this.loading = true
      try {
        const res = await getArticle(this.articleId)
        this.article = res.data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },

    async onfollow () {
      // 如果已关注，就取消关注，更新视图
      const userId = this.article.aut_id
      if (this.article.is_followed) {
        await unfollowing(userId)
        // this.article.is_followed = false
      } else {
        // 如果没关注，就关注并更新视图
        await following(userId)
        // this.article.is_followed = true
      }
      this.article.is_followed = !this.article.is_followed
    },

    async onLike () {
      // 如果已关注，就取消关注，更新视图
      if (this.article.attitude === 1) {
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 如果没关注，就关注并更新视图
        await addLike(this.articleId)
        this.article.attitude = -1
      }
      this.article.is_followed = !this.article.is_followed
    }
  }
}
</script>

<style scoped lang='less'>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
