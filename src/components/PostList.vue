<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
        >
          <template #description>
            <p v-html="item.content"></p>
          </template>
          <template #title>
            <a :href="item.postHref">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src=avatar />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import avatar from "../assets/avatar.jpg";
import {withDefaults,defineProps} from "vue";
//定义属性类型
interface Props{
  postList: any[];
}
const props = withDefaults(defineProps<Props>(),{
  postList: () => [],
})
</script>

<style scoped>

</style>