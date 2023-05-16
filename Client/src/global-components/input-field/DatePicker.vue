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


    <Litepicker
      v-model="value"
      :id="name"
      :options="{
        autoApply: true,
        singleMode: true,
        numberOfColumns: 1,
        numberOfMonths: 1,
        showWeekNumbers: true,
        minDate: new Date(minDateFilter),
        format: 'YYYY-MM-DD',
        dropdowns: {
          minYear: 2021,
          maxYear: null,
          months: true,
          years: true,
        },
      }"
      class="form-control w-full block mx-auto"
      :class="[
          (errors.length ? 'border-danger' : '')
      ]"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required"
    />


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
    minDate: {
      type: String,
      default: null,
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
      minDateFilter: null,
    }
  },
  watch: {
    modelValue: function (value) {
      this.value = value;
    },
    minDate: function (value) {
      this.minDateFilter = value;
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
