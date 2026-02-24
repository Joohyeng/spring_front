<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axiosinterceptor.js'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute() // URL 파라미터를 읽기 위해 사용
const router = useRouter() // 페이지 이동을 위해 사용
const board = ref(null)

onMounted(async () => {
  const idx = route.params.idx

  try {
    const response = await api.get(`/board/read/${idx}`)
    board.value = response.data
    console.log('받은 데이터:', board.value)
  } catch (error) {
    console.error('데이터 로드 실패:', error)
  }
})
</script>

<template>
  <div class="detail-container" v-if="board">
    <div class="detail-header">
      <h2>{{ board.title }}</h2>
      <div class="info">
        <span>번호: {{ board.idx }}</span>
      </div>
    </div>
    <hr />
    <div class="detail-content">
      {{ board.contents }}
    </div>
    <hr />
    <div class="actions">
      <button @click="$router.push('/')" class="btn-list">목록으로</button>
    </div>
  </div>
  <div v-else class="loading">데이터를 불러오는 중입니다...</div>
</template>

<style scoped></style>
