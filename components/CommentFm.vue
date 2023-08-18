<template>
  <div class="p-2">
    <form @submit.prevent="submitForm">
      <textarea
        v-model="commentData.comment"
        name="comment"
        id="comment"
        rows="4"
        class="textbox"
        @change="v$.comment.$touch"
        @input="onChangeTextarea"
        placeholder="댓글 작성"
      ></textarea>
      <span class="text-xs text-red-500" v-if="v$.comment.$error">{{
        v$.comment.$errors[0].$message
      }}</span>
      <span class="text-xs text-blue-500" v-if="commentData.success">댓글 등록 성공.</span>
      <div class="relative py-2">
        <p>{{ commentData.comment }}</p>
        <button type="submit" class="btn absolute right-2">발행</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '~/stores/user';
import { usePostsStore } from '~/stores/posts';

const user = useUserStore();
const posts = usePostsStore();

const props = defineProps({
  postDataId: Number
});

const postId = props.postDataId;
const commentData = reactive({
  success: false,
  comment: ''
});

const rules = computed(() => {
  return {
    comment: {
      required: helpers.withMessage('내용을 입력하세요.', required)
    }
  };
});
const onChangeTextarea = () => {
  commentData.success = false;
};

const v$ = useVuelidate(rules, commentData);

const submitForm = async () => {
  try {
    const result = await v$.value.$validate();
    if (result) {
      posts.addComment({
        id: Date.now(),
        postid: postId,
        comment: commentData.comment,
        User: {
          nickname: user.me.nickname
        }
      });
      commentData.comment = '';
      commentData.success = true;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
