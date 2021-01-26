<template>
  <div>
    <ul>
      <li>
        <p v-if="commentProp.creator" :contenteditable="state.editComment" @blur="editComment">
          {{ commentProp.body }}
        </p>
      </li>
    </ul>
    <p>
      <i class="fas fa-pencil-alt fa-2x pointer" v-if="state.account.id == commentProp.creatorId" @click="state.editComment =!state.editComment"></i><span>   </span>
      <i class="fa fa-trash text-danger fa-2x pointer" aria-hidden="true" v-if="state.account.id == commentProp.creatorId" @click="deleteComment"></i>
    </p>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { logger } from '../utils/Logger'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      editComment: false
    })
    return {
      state,
      deleteComment() {
        try {
          blogService.deleteComment(props.commentProp._id)
        } catch (error) {
          logger.error(error)
        }
      },
      editComment(e) {
        logger.log('editing a coment', e.target.innerText)
        try {
          blogService.editComment(props.commentProp._id, e.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss">
 .pointer{
  cursor: pointer;
}
</style>
