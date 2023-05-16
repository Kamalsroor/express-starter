<template>
  <div>
    <label>{{ label }}</label>
    <div :class="[(label ? 'mt-2' : '')]">
      <div class="form-check form-switch" v-if="!multiple">
        <input :disabled="disabled" :id="name" class="form-check-input mt-1.5" v-model="value" :value="$attrs.keyValue" :type="type" />
        <label class="form-check-label" :for="name">{{ des }}</label>
      </div>
      <div v-else-if="multiple" class="grid gap-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <div v-for="item in selectData" :key="item[$attrs.labelValue]" :value="item[$attrs.keyValue]" class="form-check form-switch">
          <input :disabled="disabled" :id="name+'-'+item[$attrs.labelValue]" class="form-check-input mt-1.5" :value="item[$attrs.keyValue]" v-model="value" :type="type" />
          <label class="form-check-label" :for="name+'-'+item[$attrs.labelValue]">{{ item[$attrs.labelValue] }}</label>
        </div>
      </div>

    </div>

    <template v-if="errors.length">
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="text-danger mt-2"
      >
        {{ error.$message }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "SwitchField",
  props: {
    label: {
      type: String,
      default: "",
    },
    des: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "checkbox",
    },
    modelValue: {
      type: Object,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: [],
    },
    selectData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      value : null,
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
  created() {

    if(this.multiple){
      this.value = this.modelValue ?? [];
    }else{
      this.value = this.modelValue;
    }
    // this.value = this.modelValue;
  },
}
</script>
