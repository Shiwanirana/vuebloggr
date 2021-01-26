<template>
  <div class="container-fluid back">
    <div class="row  mt-5 pt-5">
      <div class="col-4" v-if="state.active.creator">
        <div class="card shadow-lg" style="width: 18rem;">
          <img class="card-img-top" :src="state.active.creator.picture" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">
              {{ state.active.creator.name }}
            </h5>
            <small class="card-text">
              {{ state.active.creator.email }}
            </small>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="card text-left shadow-lg" style="height: 20rem; width: 40rem">
            <!-- <img class="card-img-top" : alt=""> -->
            <div class="card-body">
              <h4 class="card-title" v-if="state.active.creator" :contenteditable="state.editBlog" @blur="editBlog">
                {{ state.active.title }}
              </h4>
              <p class="card-text" v-if="state.active.creator" :contenteditable="state.editBlog" @blur="editBlog">
                {{ state.active.body }}
              </p>

              <p>
                <i class="fas fa-pencil-alt fa-2x pointer" v-if="state.account.id == state.active.creatorId" @click="state.editBlog=!state.editBlog"></i><span>   </span>
                <i class="fa fa-trash text-danger fa-2x pointer" aria-hidden="true" v-if="state.account.id == state.active.creatorId" @click="deleteBlog"></i>
              </p>

              <!-- <p>
                <i class="fa fa-thumbs-up" aria-hidden="true" v-if="state.account.id == blogProp.creatorId" @click="state.editBlog = !state.editBlog"></i><span>   </span>
                <i class="fa fa-trash text-danger" aria-hidden="true" v-if="state.account.id == blogProp.creatorId" @click="deleteBlog"></i>
              </p> -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="card text-left shadow-lg" style="height: 80rem; width: 40rem">
            <form id="commentForm" type="submit" @submit.prevent="addComments">
              <input type="text"
                     name="newComment"
                     v-model="state.newComment.body"
                     size="50"
                     minlength="1"
                     maxlength="50"
              >
              <button class="btn btn-success" type="submit">
                Comment
              </button>
              <!-- <QuickModel /> -->
            </form>
            <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
          </div>
        </div>

        <!-- <button class="btn btn-danger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="commentField"
                    data-bs-toggle="collapse"
                    onclick="app.postController.getcomments('${this.id}')"
                    data-bs-target="#_${this.id}"
            >
              Show Comments
            </button> -->
      <!-- <div class="collapse" id="_${this.id}" style="min-height: 20vh;">
            <div style="font-size: large; text-align: center; color: white;">
              <span class="cAlign">${this.body}</span><span class="rAlign">${this.score}  <i class="fa fa-thumbs-down text-danger cursor-pointer rAlign" onclick="app.commentController.downvote('${this.id}')" aria-hidden="true"></i> <i class="fa fa-thumbs-up text-success cursor-pointer rAlign" onclick="app.commentController.upvote('${this.id}')" aria-hidden="true"></i>
              </span>
            </div>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
// import BlogComponent from '../components/BlogComponent'
export default {
  name: 'BlogPage',
  props: {
    activeBlog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newComment: {},
      account: computed(() => AppState.account),
      active: computed(() => AppState.activeblog),
      comments: computed(() => AppState.comments)
    })
    onMounted(async() => {
      try {
        await blogService.getActiveBlog(route.params.id)
        await blogService.getComments(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      addComments() {
        try {
          logger.log(state.newComment)
          blogService.addComments(state.newComment)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
  // components: {
  //   BlogComponent
  // }
}
</script>

<style>
.back{
  background-image: url('https://i.imgur.com/RRUe0Mo.png');
  background-attachment: fixed;
}
.pointer{
  cursor: pointer;
}
</style>
