<template>
  <div class="home flex-grow-1 d-flex flex-column container-fluid img mt-2">
    <div class="row mt-3 ">
      <div class="col-8 mt-5 offset-2 title text-center  pl-5 text-light sticky">
        <!-- <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"> -->
        <h1 class=" text-light p-3 rounded d-flex align-items-center display-3 welcome">
          <b>Welcome to the Blogs World</b>
        </h1>
      </div>
    </div>
    <div class="row" v-if="state.user.isAuthenticated">
      <div class="col">
        <button type="button" class="btn btn-outline-info btn-lg" data-toggle="modal" data-target="#modelId">
          Create a Blog
        </button>
        <QuickModal />
      </div>
    </div>
    <div class="row mt-3">
      <div class="offset-4 col m-0">
        <BlogComponent v-for="blog in state.blogs" :key="blog._id" :blog-prop="blog" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { blogService } from '../services/BlogService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await blogService.getBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return { state }
  }
}
</script>

<style lang="scss">
.img{
  background-image: url('https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png');
  background-attachment: fixed;
}
.welcome{
  font-family: 'Coda Caption', sans-serif;
font-family: 'Lobster', cursive;
}
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  .title{
  text-shadow: 12px 12px 18px #8564fc;
}
.sticky {
  position: sticky;
  /* position: -webkit-sticky; */
  top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 4px 10px grey;
  background: rgba(12, 12, 68, 0.6);
  /* box-shadow: 0 0 6px lime; */
  z-index: 1;
}
#homeBlog {
  /* width: 100px;
  height: 50px;
  background-color: red; */
  font-weight: bold;
  position: relative;
  animation: mymove 40s infinite;
}
#homeBlog {animation-timing-function: linear;}

@keyframes mymove {
  from {top: 0px;}
  to {top: 4000px;}
}
}
</style>
