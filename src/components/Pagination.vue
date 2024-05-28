<!-- src/components/Pagination.vue -->
<template>
  <nav aria-label="Page navigation">
      <ul class="pagination">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
          </li>
          <li class="page-item" v-for="page in pages" :key="page" :class="{ 'active': currentPage === page }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
      </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
      type: Number,
      required: true
  },
  totalPages: {
      type: Number,
      required: true
  }
});

const emit = defineEmits(['prevPage', 'nextPage', 'goToPage']);

const pages = computed(() => {
  const pageArray = [];
  for (let i = 1; i <= props.totalPages; i++) {
      pageArray.push(i);
  }
  return pageArray;
});

const prevPage = () => {
  if (props.currentPage > 1) {
      emit('prevPage');
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
      emit('nextPage');
  }
};

const goToPage = (page) => {
  emit('goToPage', page);
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}

.page-item {
  cursor: pointer;
}

.page-item.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.page-item.active .page-link {
  background-color: #d47903;
  color: white;
}
</style>
