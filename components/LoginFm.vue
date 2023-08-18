<template>
  <div class="w-96">
    <form @submit.prevent="submitForm" class="w-full flex flex-col" v-if="store.me == null">
      <h2 class="mb-2">로그인</h2>
      <p class="mb-2">가입하신 이메일로 로그인 하세요.</p>
      <div class="relative mb-2">
        <label for="email" class="leading-8">이메일</label>
        <div class="relative">
          <input
            v-model="formData.email"
            type="text"
            name="email"
            id="email"
            placeholder="example@email.com"
            @change="v$.email.$touch"
            class="inputbox"
            :class="{
              'border-red-500 focus:border-red-500': v$.email.$error,
              'border-[#42d392] ': !v$.email.$invalid
            }"
          />
          <Icon
            v-if="!v$.email.$invalid || v$.email.$error"
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{ 'text-green-500': !v$.email.$invalid, 'text-yellow-500': v$.email.$error }"
            :name="`heroicons-solid:${!v$.email.$error ? 'check-circle' : 'exclamation'}`"
          />
        </div>
        <span class="text-xs text-red-500" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
      </div>
      <div class="relative mb-2">
        <label for="password" class="leading-8">비밀번호</label>
        <div class="relative">
          <input
            v-model="formData.password"
            type="password"
            name="password"
            id="password"
            @change="v$.password.$touch"
            class="inputbox"
            :class="{
              'border-red-500 focus:border-red-500': v$.password.$error,
              'border-[#42d392] ': !v$.password.$invalid
            }"
          />
          <Icon
            v-if="!v$.password.$invalid || v$.password.$error"
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{
              'text-green-500': !v$.password.$invalid,
              'text-yellow-500': v$.password.$error
            }"
            :name="`heroicons-solid:${!v$.password.$error ? 'check-circle' : 'exclamation'}`"
          />
        </div>
        <span class="text-xs text-red-500" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
      <div class="mt-2 flex items-center">
        <input id="loginCheck" type="checkbox" class="w-4 h-4 accent-red-500" />
        <label for="loginCheck" class="ml-2">로그인 상태유지</label>
      </div>
      <div class="flex flex-row gap-5">
        <button class="btn-red mt-4 w-full" type="submit">로그인</button>
        <NuxtLink to="/signup" class="btn-red mt-4 w-full text-center">회원가입</NuxtLink>
      </div>
    </form>
    <div class="w-96" v-if="store.me !== null">
      <p>{{ store.me.nickname }}님 로그인되었습니다</p>
      <button class="btn" @click="store.logOut()">로그아웃</button>
    </div>
  </div>
</template>

<script setup>
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '~/stores/user';

const store = useUserStore();
const formData = reactive({
  email: '',
  password: ''
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('이메일 입력은 필수입니다.', required),
      email: helpers.withMessage('이메일 형식에 맞게 입력하셈.', email)
    },
    password: {
      required: helpers.withMessage('비밀번호 입력은 필수입니다.', required),
      minLength: minLength(6)
    }
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    store.logIn({
      email: formData.email,
      nickname: '에스씨'
    });
  } else {
    alert('error! form is not submitted.');
  }
};
</script>

<style scoped></style>
