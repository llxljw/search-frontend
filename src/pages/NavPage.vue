<template>
    <a-layout-header class="header">
      <a-row :gutter="16" class="header-row">
        <a-col :span="4" class="header-col">
          <a href="/" class="header-logo">
            <img :src="avatar" alt="Logo">
          </a>
        </a-col>
        <a-col :span="16" class="header-col">
          <a-menu v-model:selectedKeys="current" @click="handleMenuClick" mode="horizontal" class="header-menu" >
            <a-menu-item key="index">
              <router-link to="index">首页</router-link>
              </a-menu-item>
            <a-menu-item key="search">
              <router-link to="search">搜索中台</router-link>
            </a-menu-item>
            <a-menu-item key="input">
              <router-link to="input">发布</router-link>
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="4" class="header-col">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <img :src="avatar" alt="Logo">
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="" @click="logout">退出登录</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">个人中心</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-layout-header>
<!--  <router-view></router-view>-->
</template>

<script setup lang="ts">
import { defineComponent, onBeforeMount, ref, watchEffect } from "vue";
import avatar from '@/assets/avatar.jpg';
import ArticleList from "@/components/ArticleList.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";
import IndexPage from "@/pages/IndexPage.vue";
import loginAxios from "@/plugins/loginAxios";

let flag = false;
const route = useRoute();
const router = useRouter();
const current=ref<string[]>(['index']);
const articleList = ref([]);



const handleMenuClick = (value: any) => {
  router.push({
    path: `/${value.key}`,
  });
    loginAxios.post("/search/all",{})
      .then((res: any) =>{
        console.log("结果为",res);
      })
  // if (value.key === 'index'){
  //   getArticleList();
  // }
    };
const getArticleList = () =>{
  myAxios.post("/search/all",{})
    .then((res: any) =>{
      articleList.value =  res.postList;
    })
}
const logout=()=>{
  loginAxios.get("/user/get/login").then((res: any)=>{
    console.log(res);
    router.push({
      path: "/login"
    });
  })
}

</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.header-row {

  height: 64px;
  line-height: 64px;
}

.header-col {

  text-align: center;
}

img {
  height: 32px;
  margin-right: 16px;
}

.header-menu {
  line-height: 64px;
}
</style>