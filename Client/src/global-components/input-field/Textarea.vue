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

    <textarea v-model="value" :id="name"   :class="[
                (errors.length ? 'border-danger' : '')
              ]"
             :name="name" rows="4" cols="50"
             :placeholder="placeholder"
             :readonly="readonly"
             :required="required"
             class="form-control w-full"></textarea>

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

export default {
  name: "TextAreaField",
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
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      value: null,
    }
  },
  watch: {
    modelValue: function (value) {
      this.value = value;
    },
    value: {
      handler(value, oldVal) {
        this.$emit('update:modelValue', this.value);
      },
      deep: true
    },
  },
  computed: {

  },
  created() {
    this.value = this.modelValue;
  },
}
</script>
