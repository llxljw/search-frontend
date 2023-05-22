<template>
  <a-card class="card" style="width: 400px;">
    <a-form ref="formRef" :model="formData" :rules="rules" class="login-form" @submit="handleSubmit">
      <a-form-item>
        <h1 class="title">知识星球</h1>
      </a-form-item>
      <a-form-item label="账户" :colon="false" prop="userAccount">
        <a-input placeholder="请输入账户名" v-model:value="formData.userAccount" />
      </a-form-item>
      <a-form-item label="密码" :colon="false" prop="userPassword">
        <a-input type="password" placeholder="请输入密码" v-model:value="formData.userPassword" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-btn">登录</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
import MyAxios from "@/plugins/myAxios";
import loginAxios from "@/plugins/loginAxios";
import { useRouter } from "vue-router";

const router = useRouter();
const formRef = ref(null);
const formData = ref({
  userAccount: '',
  userPassword: '',
});

const rules = {
  userAccount: [
    { required: true, message: '账号不能为空' },
    { min: 4, message: '账号长度不能小于4个字符' },
  ],
  userPassword: [
    { required: true, message: '密码不能为空' },
    { min: 8, message: '密码长度不能小于8个字符' },
  ],
};

const handleSubmit = () => {
  loginAxios.post("/user/login",formData.value)
    .then((res: any) =>{
      console.log("token为",res.data)
      if (res.code === 0) {
        // token保存到sessionStorage
        sessionStorage.setItem("token",res.data);
        router.push("/index");
        message.success('登录成功');
      } else {
        message.error('登录失败，请检查你的账号密码是否正确');
      }

    })
}

</script>

<style scoped>
.card {
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 24px;
}

.login-btn {
  width: 100%;
}
</style>