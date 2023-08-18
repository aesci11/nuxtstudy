<template>
  <section class="container w-5/6">
    <div v-if="post">
      <PostCard :postdata="post" />
    </div>
    <div v-else>
      <p>해당 개시글이 존재하지 않습니다.</p>
    </div>
  </section>
</template>

<script setup>
import { usePostsStore } from '~/stores/posts';

const { id } = useRoute().params;

const posts = usePostsStore();

const post = computed(() => {
  return posts.mainPosts.find((e) => e.id == id);
});
</script>

<style scoped></style>
