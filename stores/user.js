export const useUserStore = defineStore('user', {
  state: () => ({
    me: null,
    followerList: [
      {
        id: 1,
        userName: '카리나'
      },
      {
        id: 2,
        userName: '윈터'
      },
      {
        id: 3,
        userName: '지젤'
      },
      {
        id: 4,
        userName: '닝닝'
      },
      {
        id: 5,
        userName: '이미순'
      },
      {
        id: 6,
        userName: '이현정'
      },
      {
        id: 7,
        userName: '이혜란'
      },
      {
        id: 8,
        userName: '허지연'
      }
    ],
    followingList: [
      {
        id: 1,
        userName: '카리나'
      },
      {
        id: 2,
        userName: '윈터'
      },
      {
        id: 3,
        userName: '지젤'
      },
      {
        id: 4,
        userName: '닝닝'
      },
      {
        id: 5,
        userName: '이미순'
      },
      {
        id: 6,
        userName: '이현정'
      },
      {
        id: 7,
        userName: '이혜란'
      },
      {
        id: 8,
        userName: '허지연'
      }
    ],
    hasMoreFollower: true,
    hasMoreFollowing: true
  }),
  getters: {},
  actions: {
    joinMe(payload) {
      this.me = payload;
    },
    logIn(payload) {
      this.me = payload;
    },
    logOut(payload) {
      this.me = null;
    },
    changeNickname(payload) {
      this.me.nickname = payload.nickname;
    },
    addFollower(payload) {
      this.followerList.push(payload);
    },
    addFollowing(payload) {
      this.followingList.push(payload);
    },
    removeFollower(payload) {
      this.followerList.splice(payload, 1);
    },
    removeFollowing(payload) {
      this.followingList.splice(payload, 1);
    },
    loadMoreFollowers() {
      if (this.hasMoreFollower) {
        this.followerList.push();
      }
    },
    loadMoreFollowings() {
      if (this.hasMoreFollowing) {
        this.followingList.push();
      }
    }
  }
});

const limit = 3;
