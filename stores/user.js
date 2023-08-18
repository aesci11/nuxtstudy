export const useUserStore = defineStore('user', {
  state: () => ({
    me: null,
    followerList: [],
    followingList: [],
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
