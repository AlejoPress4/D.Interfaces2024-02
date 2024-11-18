<template>
  <div class="full-screen-menu d-flex align-items-center justify-content-center">
    <div class="text-center">
      <h1 class="mb-5">Sistema de Logística</h1>
      <div class="row">
        <div v-for="option in menuOptions" :key="option.name" class="col-md-4 mb-4">
          <button @click="$emit('select', option.name)" class="btn btn-primary btn-lg btn-block">
            {{ option.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  menuOptions: {
    type: Array,
    required: true,
  },
})

defineEmits(['select'])
</script>

<style scoped>
.full-screen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f8f9fa;
  z-index: 1000;
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
