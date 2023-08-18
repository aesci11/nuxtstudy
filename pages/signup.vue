<template>
  <section class="container w-3/4">
    <form @submit.prevent="submitForm" class="w-full flex flex-col gap-4">
      <div class="relative mb-2">
        <label for="email" class="leading-8">회원가입</label>
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
      <div class="relative mb-2">
        <label for="passwordCheck" class="leading-8">비밀번호 확인</label>
        <div class="relative">
          <input
            v-model="formData.passwordCheck"
            type="password"
            name="passwordCheck"
            id="passwordCheck"
            @change="v$.passwordCheck.$touch"
            class="inputbox"
            :class="{
              'border-red-500 focus:border-red-500': v$.passwordCheck.$error,
              'border-[#42d392] ': !v$.passwordCheck.$invalid
            }"
          />
          <Icon
            v-if="!v$.passwordCheck.$invalid || v$.passwordCheck.$error"
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{
              'text-green-500': !v$.passwordCheck.$invalid,
              'text-yellow-500': v$.passwordCheck.$error
            }"
            :name="`heroicons-solid:${!v$.passwordCheck.$error ? 'check-circle' : 'exclamation'}`"
          />
        </div>
        <span class="text-xs text-red-500" v-if="v$.passwordCheck.$error">{{
          v$.passwordCheck.$errors[0].$message
        }}</span>
      </div>
      <div class="relative mb-2">
        <label for="nickname" class="leading-8">닉네임</label>
        <div class="relative">
          <input
            v-model="formData.nickname"
            type="text"
            name="nickname"
            id="nickname"
            @change="v$.nickname.$touch"
            class="inputbox"
            :class="{
              'border-red-500 focus:border-red-500': v$.nickname.$error,
              'border-[#42d392] ': !v$.nickname.$invalid
            }"
          />
          <Icon
            v-if="!v$.nickname.$invalid || v$.nickname.$error"
            class="absolute right-2 h-full text-xl text-green-500"
            :class="{
              'text-green-500': !v$.nickname.$invalid,
              'text-yellow-500': v$.nickname.$error
            }"
            :name="`heroicons-solid:${!v$.nickname.$error ? 'check-circle' : 'exclamation'}`"
          />
        </div>
        <span class="text-xs text-red-500" v-if="v$.nickname.$error">{{
          v$.nickname.$errors[0].$message
        }}</span>
      </div>
      <div class="relative mb-2">
        <div class="flex items-center">
          <input
            v-model="formData.terms"
            type="checkbox"
            name="terms"
            id="terms"
            @change="v$.terms.$touch"
            class="w-4 h-4 accent-red-500"
          />
          <label for="terms" class="ml-2">약관동의해라</label>
        </div>
        <span class="text-xs text-red-500" v-if="v$.terms.$error">{{
          v$.terms.$errors[0].$message
        }}</span>
      </div>
      <div>
        <button class="btn-red mt-4 w-full" type="submit">가입하기</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '~/stores/user';

useHead({
  title: '회원가입'
});
definePageMeta({
  middleware: 'auth'
});

const router = useRouter();
const users = useUserStore();
const formData = reactive({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  terms: false
});

watch(
  () => users.me,
  () => {
    router.push({
      path: '/'
    });
  }
);

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('이메일 입력은 필수입니다.', required),
      email: helpers.withMessage('이메일 형식에 맞게 입력하셈.', email)
    },
    password: {
      required: helpers.withMessage('비밀번호 입력은 필수입니다.', required),
      minLength: minLength(6)
    },
    passwordCheck: {
      required: helpers.withMessage('비밀번호 확인 입력은 필수입니다.', required),
      sameAs: helpers.withMessage('비밀번호 맞춰주셈', sameAs(formData.password))
    },
    nickname: { required: helpers.withMessage('닉네임 입력은 필수임', required) },
    terms: { sameAs: helpers.withMessage('동의하셈', sameAs(true)) }
  };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  try {
    const result = await v$.value.$validate();
    if (result) {
      users.joinMe({
        email: formData.email,
        nickname: formData.nickname
      });
      router.push({
        path: '/'
      });
    } else {
      alert('양식 제대로 써라');
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
