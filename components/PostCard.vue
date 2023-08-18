<template>
  <div class="card p-4">
    <h2>
      <NuxtLink :to="`/user/${postData.User.id}`">{{ postData.User.nickname }}</NuxtLink>
    </h2>
    <p class="py-2">{{ postData.content }}</p>
    <NuxtLink :to="`/post/${postData.id}`">{{ postData.id }}</NuxtLink>
    <div class="flex flex-row gap-10 py-2">
      <button class="btn">11</button>
      <button class="btn">11</button>
      <!-- 댓글 작성 -->
      <button type="button" @click="showcomment = !showcomment" class="relative">
        <Icon class="h-full text-orange-400" :name="'ic:outline-mode-comment'" size="30" />
      </button>
      <!-- 수정, 삭제 -->
      <button type="button" @click="showmore = !showmore" class="relative">
        <Icon class="h-full text-orange-400" :name="'material-symbols:more-horiz'" size="30" />
        <div
          class="absolute w-24 z-10 shadow bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700"
          v-if="showmore"
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              수정
            </li>
            <li
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              @click="onRemoveData"
            >
              삭제
            </li>
          </ul>
        </div>
      </button>
    </div>
    <!-- 댓글 작성 Form -->
    <div class="my-3" v-if="showcomment">
      <CommentFm :postDataId="postData.id" />
      <ul v-for="(c, index) in postData.comments" :key="index">
        <h2>{{ c.User.nickname }}</h2>
        <p>{{ c.comment }}</p>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { usePostsStore } from '~/stores/posts';

const posts = usePostsStore();
const showmore = ref(false);
const showcomment = ref(false);
const props = defineProps({
  postdata: Object
});
const postData = props.postdata;

const onRemoveData = () => {
  posts.removeMainPost(props.postdata);
};
</script>

<style scoped></style>
