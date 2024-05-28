<template>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="prevPage"><</a>
        </li>
        <li
          class="page-item"
          v-for="page in pages"
          :key="page"
          :class="{ 'active': currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">></a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    computed: {
      pages() {
        const pagesArray = [];
        for (let i = 1; i <= this.totalPages; i++) {
          pagesArray.push(i);
        }
        return pagesArray;
      }
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.$emit('changePage', this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('changePage', this.currentPage + 1);
        }
      },
      goToPage(page) {
        this.$emit('changePage', page);
      }
    }
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
  