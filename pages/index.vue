<template>
  <section class="container w-5/6 flex flex-col gap-5">
    <PostFm />
    <PostCard v-for="p in posts.mainPosts" :key="p.id" :postdata="p" />
  </section>
</template>

<script setup>
import { usePostsStore } from '~/stores/posts';

const posts = usePostsStore();

const { data } = await useAsyncData('post', () => $fetch(posts.loadPosts()));

const onScroll = () => {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight - 250
  ) {
    if (posts.hasMorePost) {
      posts.loadPosts();
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped></style>
