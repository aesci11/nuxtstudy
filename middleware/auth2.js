import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to, from) => {
  const karina = useUserStore();
  if (!karina.me) {
    return abortNavigation(alert('로그인해라!'));
  }
});
