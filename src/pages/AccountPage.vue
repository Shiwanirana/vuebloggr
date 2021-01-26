<template>
  <div class="about back container-fluid">
    <div class="row mt-5 pt-5">
      <div class="col-3 text-center">
        <h1 class="text-light display-3 title">
          <b> Welcome </b>
        </h1>
        <h3 class="text-light">
          <b>{{ state.account.name }}</b>
        </h3>

        <img class="rounded" :src="state.account.picture" alt="" />
        <p class="text-light">
          {{ state.account.email }}
        </p>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#modelId">
          Create a Blog
        </button>
        <QuickModal />
      </div>
      <!-- <div class="row mt-3"> -->
      <div class="ml-5 text-center col-8">
        <!-- v-if="blogProp.creator.email===state.account.email" -->
        <BlogComponent v-for="myblog in state.myblogs" :key="myblog._id" :blog-prop="myblog" />
      </div>
    <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      myblogs: computed(() => AppState.myblogs),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await blogService.getMyBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return { state }
    // return {
    //   account: computed(() => AppState.account)
    // }
  }
}
</script>

<style scoped>
.back{
 background-image: url('https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg');
 background-attachment: fixed;
}
 .title{
  text-shadow: 12px 12px 18px #e42942;
}
img {
  max-width: 100px;
}
.pointer{
  cursor: pointer;
}
</style>
