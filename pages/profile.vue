<template>
  <section class="container w-5/6 flex flex-col gap-5">
    <div class="card p-4">
      <p class="mb-1">내 프로필</p>
      <form @submit.prevent="submitForm" class="flex flex-col">
        <p class="mb-2">닉네임</p>
        <input
          v-model="nick.nickname"
          type="text"
          name="nickname"
          id="nickname"
          class="inputbox-sm mb-2"
          @change="v$.nickname.$touch"
        />
        <span class="text-xs text-red-500" v-if="v$.nickname.$error">{{
          v$.nickname.$errors[0].$message
        }}</span>
        <button type="submit" class="btn w-20">수정</button>
      </form>
    </div>
    <div class="card p-4">
      <p class="py-2">팔로워</p>
      <div v-for="(f, index) in user.followerList" :key="index">
        <ul class="flex flex-row items-center gap-3">
          <li>{{ f.userName }}</li>
          <button class="btn w-5 h-5" @click="user.removeFollower(index)">11</button>
        </ul>
      </div>
    </div>
    <div class="card p-4">
      <p class="py-2">팔로잉</p>
      <div v-for="(i, index) in user.followingList" :key="index">
        <ul class="flex flex-row items-center gap-3">
          <li class="">{{ i.userName }}</li>
          <button class="btn w-5 h-5" @click="user.removeFollowing(index)">11</button>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

definePageMeta({
  middleware: 'auth2'
});

const user = useUserStore();
const nick = reactive({
  nickname: ''
});

const rules = computed(() => {
  return {
    nickname: {
      required: helpers.withMessage('닉네임을 입력하세요', required)
    }
  };
});

const v$ = useVuelidate(rules, nick);

const submitForm = async () => {
  try {
    const result = await v$.value.$validate();
    if (result) {
      user.changeNickname({
        nickname: nick.nickname
      });
      v$.value.$reset();
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
