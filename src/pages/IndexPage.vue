<template>
  <div class="index-page">
<!--    <a-input-search-->
<!--      v-model:value="searchText"-->
<!--      placeholder="请输入搜索关键词"-->
<!--      enter-button="搜索"-->
<!--      size="large"-->
<!--      @search="onSearch"-->
<!--    />-->
    <a-auto-complete
      v-model:value="searchText"
      :options="options"
      style="width: 85%"
      placeholder="input here"
      @select="onSearch"
      @search="getSearchPrompt"
    />
    <a-button
      type="primary"
      style="left-margin: 10px;width: 15%"
      @click="onSearch(searchText)"
    >搜索</a-button>

    <MyDivider />
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList :picture-list="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :user-list="userList" />
      </a-tab-pane>
      <a-tab-pane key="video" tab="视频">
        <VideosList :video-list="videoList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";
import ArticleIndexPage from "@/pages/NavPage.vue";
import NavPage from "@/App.vue";
import VideosList from "@/components/VideosList.vue";

const postList = ref([]);

const userList = ref([]);

const pictureList = ref([]);

const videoList = ref([]);


const route = useRoute();
const router = useRouter();
const activeKey = route.params.category;

const initSearchParams = {
  type: activeKey,
  text: "",
  pageSize: 30,
  pageNum: 1,
};

const searchText = ref(route.query.text || "");

const options = ref<any[]>([]);
const getSearchPrompt = (value: string) => {
  options.value = [];
  if (value){
    myAxios.get("/search/getSearchPrompt?keyword="+value).then((res: any)=>{
      // console.log(res)
      for (let i =0;i<res.length;i++){
        const tempMap={
          value: res[i],
        };
        options.value.push(tempMap);
      }
    })
  }
}

/**
 * 加载单类数据
 * @param params
 */
const loadData = (params: any) => {
  const { type = "post" } = params;
  if (!type) {
    message.error("类别为空");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("search/all", query).then((res: any) => {
    console.log(res)
    if (type === "post") {
      postList.value = res.dataList;
    } else if (type === "user") {
      userList.value = res.dataList;
    } else if (type === "picture") {
      pictureList.value = res.dataList;
    }else if (type === "video") {
      videoList.value = res.dataList;
    }
  });
};

const searchParams = ref(initSearchParams);

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    type: route.params.category,
  } as any;
  if (searchParams.value.type === undefined){
    searchParams.value.type = 'post';
  }
  loadData(searchParams.value);
});

const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  });
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParams.value,
  });
};
</script>
<style>
.index-page {
  padding: 20px;
  margin: 0 auto;
  max-width: 1024px;

}
</style>