<template>
  <div class="nav-container">
    <a-menu v-model:selectedKey="activeKey.value" mode="horizontal" @click="handleMenuClick">
      <a-menu-item key="home">首页</a-menu-item>
      <a-menu-item key="search">搜索</a-menu-item>
      <a-menu-item key="post">发布</a-menu-item>
    </a-menu>
    <a-button type="primary" v-if="!isLogin" @click="handleLogin">登录</a-button>
    <a-button type="danger" v-else @click="handleLogout">退出</a-button>
  </div>
  <MyDivider/>
  <img v-if="imgFlag" :src="avatar" >
  <ArticleList v-if="flag" :article-list="articleList"/>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from "vue";
import ArticleList from "@/components/ArticleList.vue";
import myAxios from "@/plugins/myAxios";
import MyDivider from "@/components/MyDivider.vue";
import avatar from "@/assets/avatar.jpg";

let flag = false;
let imgFlag = false;
const activeKey = ref('home');
const isLogin = ref(false);
const articleList = ref([]);

onBeforeMount(() =>{
  if (activeKey.value === 'home'){
    imgFlag = false;
    flag = true;
  }

})
const handleMenuClick = (param: any) => {
  if (param.key === 'home'){
    getArticleList(param.key);
  }
  activeKey.value = param.key;
};
const getArticleList = (key: any) =>{
  myAxios.post("/search/all",{})
    .then((res: any) =>{
      articleList.value =  res.postList;
    })
}

const handleLogin = () => {
console.log(1)
};

const handleLogout = () => {
  console.log(1)
};
</script>

<style scoped>
.nav-container {
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
img {
  width: 500px;
}
</style>