# Vue 3 + TS Best Practices

## Mục lục
1. [Cấu hình dự án](#cấu-hình-dự-án)
2. [TypeScript Types](#typescript-types)
3. [Component Structure](#component-structure)
4. [Props & Emits](#props--emits)
5. [Composables](#composables)
6. [State Management](#state-management)
7. [Performance](#performance)
8. [Testing](#testing)

---

## 1. Cấu hình dự án

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "types": ["vite/client"]
  }
}
```

---

## 2. TypeScript Types

### Sử dụng Generic Types
```typescript
<script setup lang="ts">
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  return response.json()
}

// Sử dụng
const userData = await fetchData<User>('/api/user')
</script>
```

---

## 3. Component Structure

### Tổ chức thứ tự trong `<script setup>`
```typescript
<script setup lang="ts">
// 1. Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. Props & Emits
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [value: number]
  delete: []
}>()

// 3. Composables
const router = useRouter()

// 4. Reactive state
const localCount = ref(0)

// 5. Computed
const displayCount = computed(() => props.count ?? localCount.value)

// 6. Methods
const handleClick = () => {
  emit('update', displayCount.value + 1)
}

// 7. Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})

// 8. Watch/WatchEffect
watch(() => props.count, (newVal) => {
  console.log('Count changed:', newVal)
})
</script>
```

---

## 4. Props & Emits

### Định nghĩa Props với TypeScript
```typescript
<script setup lang="ts">
// ✅ Runtime + Type validation
interface Props {
  title: string
  count?: number
  items: string[]
  user?: User | null
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  user: null
})

// ✅ Props với validator
const props = defineProps<{
  status: 'pending' | 'active' | 'inactive'
  priority: number
}>()
</script>
```

### Định nghĩa Emits với TypeScript
```typescript
<script setup lang="ts">
// Type-safe emits
const emit = defineEmits<{
  // (eventName: [payload types...])
  change: [value: string]
  update: [id: number, value: string]
  delete: [] // no payload
  submit: [data: FormData]
}>()

// Sử dụng
const handleChange = (value: string) => {
  emit('change', value)
}
</script>
```

### Props Read-only
```typescript
<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

// ❌ Không nên mutate props trực tiếp
// props.modelValue = 'new value'

// ✅ Nên tạo local copy hoặc computed
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
```

---

## 5. Composables

### Tạo Composable có type-safe
```typescript
// composables/useCounter.ts
import { ref, computed, Ref } from 'vue'

interface UseCounterOptions {
  initialValue?: number
  min?: number
  max?: number
}

interface UseCounterReturn {
  count: Ref<number>
  doubleCount: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, min, max } = options
  
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    if (max === undefined || count.value < max) {
      count.value++
    }
  }
  
  const decrement = () => {
    if (min === undefined || count.value > min) {
      count.value--
    }
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
```

### Composable cho API calls
```typescript
// composables/useApi.ts
import { ref, Ref } from 'vue'

interface UseApiReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  execute: () => Promise<void>
}

export function useApi<T>(url: string): UseApiReturn<T> {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  
  const execute = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('API Error')
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, execute }
}
```

---

## 6. State Management

### Sử dụng Store trong Component
```typescript
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// Reactive access
const { user, isAuthenticated } = storeToRefs(userStore)

// Actions
const handleLogout = () => {
  userStore.logout()
}
</script>
```

---

## 7. Performance

### Lazy Loading Components
```typescript
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)
</script>
```

### Computed vs Methods
```typescript
<script setup lang="ts">
// ✅ Nên: Sử dụng computed cho giá trị cần cache
const filteredItems = computed(() => {
  return items.value.filter(item => item.active)
})

// ❌ Không nên: Gọi method trong template sẽ chạy mỗi lần re-render
const getFilteredItems = () => {
  return items.value.filter(item => item.active)
}
</script>

<template>
  <!-- ✅ Tốt -->
  <div v-for="item in filteredItems" :key="item.id">
  
  <!-- ❌ Không tốt -->
  <div v-for="item in getFilteredItems()" :key="item.id">
</template>
```

### Virtual Scrolling cho danh sách lớn
```typescript
<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: number
  name: string
}

const items = ref<Item[]>(/* large array */)

// Sử dụng thư viện như vue-virtual-scroller
// hoặc tự implement với Intersection Observer
</script>
```

---

## 8. Testing

### Unit Test với Vitest
```typescript
// components/__tests__/Counter.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from '../Counter.vue'

describe('Counter.vue', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter, {
      props: {
        initialCount: 5
      }
    })
    
    expect(wrapper.text()).toContain('5')
  })
  
  it('increments count on button click', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.text()).toContain('1')
  })
  
  it('emits update event', async () => {
    const wrapper = mount(Counter)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')?.[0]).toEqual([1])
  })
})
```

### Test Composables
```typescript
// composables/__tests__/useCounter.spec.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '../useCounter'

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })
  
  it('respects max value', () => {
    const { count, increment } = useCounter({ max: 5 })
    
    for (let i = 0; i < 10; i++) {
      increment()
    }
    
    expect(count.value).toBe(5)
  })
})
```

---

## Các quy tắc chung

### 1. Tránh `any` type
```typescript
// ❌ Tránh
const data = ref<any>(null)

// ✅ Nên
const data = ref<User | null>(null)
// hoặc
const data = ref<unknown>(null)
```

### 2. Đặt tên file component với PascalCase
```
✅ UserProfile.vue
✅ ProductCard.vue
❌ userProfile.vue
❌ product-card.vue
```
