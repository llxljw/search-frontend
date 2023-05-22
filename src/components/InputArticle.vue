<template>
  <MyDivider/>
  <div class="form-contain">
    <a-card>
      <a-form :model="formData" @submit="handleSubmit">
        <a-form-item label="标题">
          <a-input v-model:value="formData.title" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model:value="formData.description"  />
        </a-form-item>
        <a-form-item  label="内容">
          <a-card>
            <mavon-editor class="editor-container"
                          :ishljs="true"
                          @imgAdd="handleEditorImgAdd"
                          @imgDel="handleEditorImgDel"
                          v-model="formData.content" ></mavon-editor>
          </a-card>
        </a-form-item>
        <a-form-item style="text-align: right;"> <!-- 使用 text-align:right 右对齐 -->
          <a-button type="primary" html-type="submit" style="margin-right: 10px; background-color: #1890ff; border-color: #1890ff;">
            发布
          </a-button>
          <a-button html-type="submit" style="background-color: #f5f5f5; border-color: #d9d9d9; color: #666;">
            保存草稿
          </a-button>
        </a-form-item>

      </a-form>

    </a-card>
  </div>
</template>

<script setup lang="ts">
import 'mavon-editor/dist/css/index.css';
import MyDivider from "@/components/MyDivider.vue";
import loginAxios from "@/plugins/loginAxios";
import { defineProps, onMounted, reactive, ref, UnwrapRef, withDefaults } from "vue";
import { Moment } from "moment/moment";
import myAxios from "@/plugins/myAxios";



interface FormData {
  title: string,
  description: string,
  content: string,
}
const formData: UnwrapRef<FormData> = reactive({
      title: '',
      description: '',
      content: '',
});
const handleSubmit = () => {
  // alert(sessionStorage.getItem('token'))
  // console.log(formData)
  // 处理表单提交逻辑
  loginAxios.post("/post/add", {})
    .then((res: any) =>{
      console.log(res);
    })
    };

// const checkLogin=()=>{
//   console.log(sessionStorage.getItem('token'))
//   loginAxios.post("/user/get/login")
//     .then((res: any)=>{
//       alert(res)
//       console.log(res)
//     })
const handleEditorImgAdd =(pos: any, file: any) =>{
  let formdata = new FormData()
 let uploadFileRequest={
    biz:"user_avtar"
 }
  formdata.append('file', file)
  console.log(file)
  formdata.append('uploadFileRequest',JSON.stringify(uploadFileRequest))
  loginAxios({
    url: "file/upload",//请求地址
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((res: any)=>{
    console.log(res);
  })
  // myAxios.post('/api/upload/fileds', formdata).then(res => {
  //   if (res.data.code === 200) {
  //     this.$Message.success('上传成功')
  //     let url = res.data.data
  //     let name = $file.name
  //     if (name.includes('-')) {
  //       name = name.replace(/-/g, '')
  //     }
  //     let content = this.form.content
  //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
  //     if (content.includes(name)) {
  //       let oStr = `(${pos})`
  //       let nStr = `(${url})`
  //       let index = content.indexOf(oStr)
  //       let str = content.replace(oStr, '')
  //       let insertStr = (soure, start, newStr) => {
  //         return soure.slice(0, start) + newStr + soure.slice(start)
  //       }
  //       this.form.content = insertStr(str, index, nStr)
  //     }
  //   } else {
  //     this.$Message.error(res.data.msg)
  //   }
  // })
}
// handleEditorImgDel (pos) {
//   delete this.imgFile[pos]
// },


</script>

<style>
.form-contain {
  padding: 20px;
  margin: 0 auto;
  max-width: 1024px;
}
.editor-container {
  height: 300px; /*设定容器高度*/
  overflow: auto; /*启用自动滚动条*/
}
</style>