<template>
  <!-- <div class="BlogComponent col-4"> -->
  <router-link :to="{path: '/blogs/'+ blogProp._id}">
    <div class="card col-4 m-3  box" @click="setActive">
      <div class="card-body text-center">
        <!-- <img v-if="state.account.id=== blogProp.creatorId" :src=" blogProp.creator.picture" alt="" /> -->
        <h5 :contenteditable="state.editBlog" @blur="editBlog">
          Title: {{ blogProp.title }}
        </h5>
        <small>
          Author: {{ blogProp.creator.name }}
        </small>
        <p v-if="state.account.id=== blogProp.creatorId">
          {{ blogProp.body }}
        </p>
      </div>
    </div>
  </router-link>
  <div class="row">
    <div class="col-4">
      <p>
        <i class="fas fa-pencil-alt fa-2x pointer" v-if="state.account.id == blogProp.creatorId" @click="state.editBlog=!state.editBlog"></i><span>   </span>
        <i class="fa fa-trash text-danger fa-2x pointer" aria-hidden="true" v-if="state.account.id == blogProp.creatorId" @click="deleteBlog"></i>
      </p>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editBlog: false
    })
    return {
      state,
      setActive() {
        try {
          logger.log(props.blogProp._id)
          blogService.getActiveBlog(props.blogProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      deleteBlog() {
        try {
          blogService.deleteBlog(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editBlog(e) {
        logger.log('editing blog', e.target.innerText)
        try {
          blogService.editBlog(props.blogProp.id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}

</script>

<style scoped>
.box{
  border: rgb(53, 20, 20) solid;
  border-radius: 5%;
  background:rgb(93, 129, 228);
  color: aliceblue;
  box-shadow: 3px 3px , -1em 0 .4em rgb(87, 7, 192);
}
.pointer{
  cursor: pointer;
}
</style>
