<template>
  <div>
    <ul>
      <li>
        <p :contenteditable="state.editComment" @blur="editComment">
          {{ commentProp.body }}
        </p>
      </li>
    </ul>
    <p>
      <i class="fa fa-thumbs-up" aria-hidden="true" @click="editComment"></i><span>   </span>
      <i class="fa fa-trash text-danger" aria-hidden="true" @click="deleteComment"></i>
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
      account: computed(() => AppState.account)
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
