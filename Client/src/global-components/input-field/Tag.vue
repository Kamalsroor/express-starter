<template>
  <div>
    <label v-if="label"
           :class="[(flexTitle ? 'order-1 ml-4' : '')]"
           :for="name"
           class="form-label">
      {{ label }}
      <template v-if="label">
        <span v-if="required" class="text-danger text-sm">*</span>
      </template>
    </label>
    <div class="relative flex items-stretch flex-grow focus-within:z-10">

 <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
      <!-- @tags-changed="newTags => tags = newTags" -->

    </div>


    <template v-if="errors.length">
      <div v-for="(error, index) in errors"
           :key="index"
           class="text-danger mt-2">
        {{ error.$message }}
      </div>
    </template>
  </div>
</template>

<script>
import VueTagsInput from '@sipec/vue3-tags-input';
export default {
  name: "TagField",
  components: {
    VueTagsInput,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tag: '',
      tags: [],
    }
  },
  watch: {
    modelValue: function (value) {
      this.tags = value != null ? value : [];
    },
    tags: {
      handler(value, oldVal) {
        this.$emit('update:modelValue', this.tags);
      },
      deep: true
    },
  },
  computed: {
  
  },
  created() {
    if(this.modelValue != null){
      this.tags = this.modelValue;
    }
  },
}
</script>
