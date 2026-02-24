<script setup>
import { ref } from 'vue' // 1. ref를 꼭 불러와야 합니다.
import { api } from '@/plugins/axiosinterceptor.js' // export default한 객체를 http라는 이름으로 받음
import { useRouter } from 'vue-router' // 페이지 이동을 위해 필요

const router = useRouter()

// 2. 입력값을 담을 반응형 변수 선언
const title = ref('')
const contents = ref('')

const submitPost = async () => {
  // 간단한 유효성 검사
  if (!title.value.trim() || !contents.value.trim()) {
    alert('제목과 내용을 입력해주세요!')
    return
  }

  try {
    // 3. 인터셉터 파일에서 내보낸 객체 안의 api를 사용
    await api.post('/board/reg', {
      title: title.value,
      contents: contents.value,
    })
    alert('등록 완료!')
    router.push('/') // 등록 후 목록으로 이동
  } catch (err) {
    console.error(err)
    alert('등록 실패!')
  }
}

const goBack = () => {
  router.go(-1) // 뒤로 가기
}
</script>

<template>
  <div class="board-write">
    <h2>게시글 작성</h2>
    <div class="form-group">
      <input v-model="title" placeholder="제목을 입력하세요" />
    </div>
    <div class="form-group">
      <textarea v-model="contents" placeholder="내용을 입력하세요"></textarea>
    </div>
    <div class="buttons">
      <button @click="submitPost">등록하기</button>
      <button @click="goBack">취소</button>
    </div>
  </div>
</template>

<style scoped>
.board-write {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 10px;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
textarea {
  height: 200px;
}
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>
