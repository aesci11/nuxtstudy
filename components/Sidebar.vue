<template>
  <div>
    <div class="fixed w-full z-30 flex bg-white p-2 items-center justify-center h-16 px-10">
      <div
        class="ease-in-out duration-500 flex-none h-full flex items-center justify-center"
        :class="[store.sidebarOpen === false ? 'ml-12' : '']"
      >
        <h2 :class="[store.sidebarOpen === false ? '' : 'hidden']">재난방지시설 모니터링 시스템</h2>
      </div>
      <!-- SPACER -->
      <div class="grow h-full flex items-center justify-center"></div>
      <div class="flex-none h-full text-center flex items-center justify-center">
        <div class="flex space-x-3 items-center px-3">
          <div class="flex-none flex justify-center">
            <div class="w-8 h-8 flex">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                alt="profile"
                class="shadow rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <aside
      class="w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]"
      :class="[store.sidebarOpen === false ? '-translate-x-48' : '']"
    >
      <!-- open sidebar button -->
      <div
        class="w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between bg-[#1E293B] absolute top-2 rounded-full h-12"
        :class="[store.sidebarOpen === false ? 'translate-x-24 scale-x-0' : 'translate-x-0']"
      >
        <div class="flex pl-4 items-center space-x-2">
          <div class="text-white hover:text-blue-500"></div>
        </div>
        <div
          class="flex items-center space-x-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 pl-10 pr-2 py-2 rounded-full text-white"
        >
          <div class="transform ease-in-out duration-300 mr-12">트리코스</div>
        </div>
      </div>
      <div
        @click="store.openNav()"
        class="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white bg-[#1E293B] hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{3}"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      </div>
      <!-- MAX SIDEBAR-->
      <div
        class="text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
        :class="[store.sidebarOpen === false ? 'hidden' : 'flex']"
      >
        <div
          class="hover:ml-4 w-full text-white hover:text-purple-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
        >
          <h3>Dashbord</h3>
        </div>
        <div
          class="hover:ml-4 w-full text-white hover:text-purple-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
        >
          <h3>Building</h3>
        </div>
        <div
          class="hover:ml-4 w-full text-white hover:text-purple-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
        >
          <h3>EventMap</h3>
        </div>
      </div>
      <!-- MINI SIDEBAR-->
      <div
        class="mt-20 flex-col space-y-2 w-full h-[calc(100vh)]"
        :class="[store.sidebarOpen === false ? 'flex' : 'hidden']"
      >
        <div
          class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
        <div
          class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
        <div
          class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useCounterStore } from '~/stores/counter';

const store = useCounterStore();
</script>

<style scoped></style>
