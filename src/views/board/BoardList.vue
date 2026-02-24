<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axiosinterceptor.js'
import { useRouter } from 'vue-router'

const boards = ref([])
const router = useRouter()

const fetchBoards = async () => {
  try {
    const response = await api.post('/board/list')
    boards.value = response.data
  } catch (error) {
    console.error('목록 로드 실패:', error)
    alert('데이터를 불러오는 중 오류가 발생했습니다.')
  }
}
onMounted(() => {
  fetchBoards()
})
</script>
<template>
  <div class="board-list-container">
    <div class="header">
      <h2>게시판 목록</h2>
      <button @click="router.push('/board/reg')" class="btn-write">글쓰기</button>
    </div>

    <table class="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="board in boards"
          :key="board.idx"
          @click="$router.push(`/board/read/${board.idx}`)"
        >
          <td>{{ board.idx }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.contents }}</td>
        </tr>
        <tr v-if="boards.length === 0">
          <td colspan="3" class="no-data">등록된 게시글이 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.board-list-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-write {
  background-color: #4f46e5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.board-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #333;
}
th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.title-cell {
  text-align: left;
  cursor: pointer;
}
.title-cell:hover {
  text-decoration: underline;
  color: #4f46e5;
}
.no-data {
  padding: 50px 0;
  color: #888;
}
</style>
