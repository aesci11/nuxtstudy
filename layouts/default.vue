<template>
  <div class="h-screen flex flex-col">
    <header class="shadow-sm h-16 bg-blue-50">
      <nav class="container mx-auto h-full p-3 flex justify-between items-center">
        <NuxtLink to="/" class="font-bold text-2xl">NodeBird</NuxtLink>
        <ul class="flex gap-7 items-center">
          <form @submit.prevent="onSearchHashtag">
            <input v-model="hashtag" type="text" class="w-64 p-2 pl-10" placeholder="Search.." />
          </form>
          <p>{{ hashtag }}</p>
          <li><NuxtLink to="/profile" class="text-base">프로필</NuxtLink></li>
          <li><NuxtLink to="/signup" class="text-base">회원가입</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div class="container mx-auto p-4 flex-1">
      <div class="flex flex-row h-full">
        <LoginFm class="basis-1/3 px-2 flex justify-center" />
        <div class="basis-2/3 px-2 flex justify-center w-full">
          <slot />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
const router = useRouter();
const hashtag = ref('');

const onSearchHashtag = () => {
  router.push({
    path: `/hashtag/${hashtag.value}`
  });
  hashtag.value = '';
};
</script>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
