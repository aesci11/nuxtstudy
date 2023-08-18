<template>
  <section>
    <div class="card p-3">
      <form @submit.prevent="submitForm">
        <textarea
          v-model="postData.content"
          name="content"
          id="content"
          rows="4"
          class="textbox"
          @change="v$.content.$touch"
          placeholder="어떤 신기한 일이 있었나요?"
        ></textarea>
        <span class="text-xs text-red-500" v-if="v$.content.$error">{{
          v$.content.$errors[0].$message
        }}</span>
        <span class="text-xs text-blue-500" v-if="postData.success">게시글 등록 성공.</span>
        <div class="relative mt-2">
          <button type="submit" class="btn absolute right-2">발행</button>
          <button class="btn">이미지 업로드</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { usePostsStore } from '~/stores/posts';
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const posts = usePostsStore();
const users = useUserStore();

const postData = reactive({
  success: false,
  content: ''
});

const rules = computed(() => {
  return {
    content: {
      required: helpers.withMessage('내용을 입력하세요.', required)
    }
  };
});

const v$ = useVuelidate(rules, postData);

const submitForm = async () => {
  try {
    const result = await v$.value.$validate();
    if (result) {
      posts.addMainPost({
        content: postData.content,
        User: users.me.nickname,
        comments: [],
        Image: [],
        id: Date.now(),
        createdAt: Date.now()
      });
      v$.value.$reset();
      postData.success = true;
      postData.content = '';
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
