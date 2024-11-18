<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

    <!-- List View -->
    <div v-if="view === 'list'" class="space-y-4">
      <div class="flex justify-between">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="`Search ${title}...`"
          class="px-4 py-2 border rounded-md"
        />
        <button
          @click="setView('create')"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New
        </button>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="field in fields"
              :key="field"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ field }}
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in filteredItems" :key="item.id">
            <td v-for="field in fields" :key="field" class="px-6 py-4 whitespace-nowrap">
              {{ item[field] }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900 mr-2">
                Edit
              </button>
              <button @click="deleteItem(item.id)" class="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Form -->
    <div v-else class="space-y-4">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div v-for="field in fields" :key="field" class="flex flex-col">
          <label :for="field" class="mb-1 font-medium">{{ field }}</label>
          <input
            :id="field"
            v-model="formData[field]"
            type="text"
            class="px-4 py-2 border rounded-md"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button type="button" @click="setView('list')" class="px-4 py-2 border rounded-md">
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {{ view === 'create' ? 'Create' : 'Update' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: String,
  items: Array,
  fields: Array,
  createItem: Function,
  updateItem: Function,
  deleteItem: Function,
})

const emit = defineEmits(['itemCreated', 'itemUpdated', 'itemDeleted'])

const view = ref('list')
const searchQuery = ref('')
const formData = ref({})
const editingItemId = ref(null)

const filteredItems = computed(() => {
  return props.items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )
})

const setView = (newView) => {
  view.value = newView
  if (newView === 'create') {
    formData.value = {}
    editingItemId.value = null
  }
}

const editItem = (item) => {
  formData.value = { ...item }
  editingItemId.value = item.id
  setView('edit')
}

const submitForm = async () => {
  try {
    if (view.value === 'create') {
      const newItem = await props.createItem(formData.value)
      emit('itemCreated', newItem)
    } else {
      const updatedItem = await props.updateItem(editingItemId.value, formData.value)
      emit('itemUpdated', updatedItem)
    }
    setView('list')
  } catch (error) {
    console.error('Error submitting form:', error)
    // Handle error (e.g., show error message to user)
  }
}

const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await props.deleteItem(id)
      emit('itemDeleted', id)
    } catch (error) {
      console.error('Error deleting item:', error)
      // Handle error (e.g., show error message to user)
    }
  }
}
</script>
