export const usePostsStore = defineStore('posts', {
  state: () => ({
    mainPosts: [],
    hasMorePost: true
  }),
  getters: {},
  actions: {
    addMainPost(payload) {
      this.mainPosts.unshift(payload);
    },
    removeMainPost(payload) {
      const index = this.mainPosts.findIndex((e) => e.id == payload.id);
      this.mainPosts.splice(index, 1);
    },
    addComment(payload) {
      const index = this.mainPosts.findIndex((e) => e.id == payload.postid);
      this.mainPosts[index].comments.unshift(payload);
    },
    async loadPosts() {
      // 가짜 더미데이터 만드는 코드
      const diff = totalPosts - this.mainPosts.length;
      const fakePosts = Array(diff > limit ? limit : diff)
        .fill()
        .map((v) => ({
          id: Math.random().toString(),
          User: {
            id: 1,
            nickname: '에스씨'
          },
          content: `Hello infinite scrolling~ ${Math.random()}`,
          comments: [],
          Image: []
        }));
      this.mainPosts = this.mainPosts.concat(fakePosts);
      this.hasMorePost = fakePosts.length === limit;
    }
  }
});

const limit = 10;
const totalPosts = 51;
