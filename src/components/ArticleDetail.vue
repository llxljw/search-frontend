<template>
  <div class="article-detail">
    <a-card :title="article.title" :extra="article.time">
      <div class="article-content" v-html="article.content"></div>
      <div class="article-tags">
        <a-tag v-for="(tag, index) in article.tags" :key="index">{{ tag }}</a-tag>
      </div>
      <div class="article-author">{{ article.author }}</div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from 'vue-router';


const route = useRoute();

const articleId = computed(() => route.params.id);

const article = ref< null>(null);

onMounted(async () => {
  // eslint-disable-next-line no-undef
  // article.value = await getArticleById(articleId.value);
});
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-content {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.8;
}

.article-tags {
  margin-top: 20px;
}

.article-author {
  margin-top: 20px;
  text-align: right;
}
</style>