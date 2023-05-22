<template>
  <div class="article-list">
    <a-card v-for="item in articleList" :key="item.id" class="article-card">
      <div>
        <router-link :to="'/article/' + item.id">{{ item.title }}</router-link>
      </div>
      <div>
        <a-tag v-for="(tag, index) in item.tagList" :key="index">{{ tag }}</a-tag>
      </div>
      <div class="article-content">{{ item.content }}</div>
      <div class="article-footer">
        <span>{{ item.author }}</span>
        <span>{{ item.time }}</span>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";
import myAxios from "@/plugins/myAxios";
import loginAxios from "@/plugins/loginAxios";
const articleList = ref([]);

// onMounted(() =>{
//   loginAxios.post("/search/all",{})
//     .then((res: any) =>{
//       articleList.value =  res.data.postList;
//     })
// })
</script>

<style scoped>
.article-card {
  margin-bottom: 20px;
}
.article-list {
  padding: 20px;
  margin: 0 auto;
  max-width: 1024px;
}
</style>