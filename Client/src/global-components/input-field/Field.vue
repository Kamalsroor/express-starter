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
      <div v-if="type === 'url'" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-slate-500 sm:text-sm font-normal">https://</span>
      </div>
      <div v-if="currency" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span class="sm:text-base text-slate-500">{{ $attrs.currencySign }}</span>
      </div>
      <div v-if="icon && type !== 'url' && type !== 'email'"
           class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="iconName" aria-hidden="true"
                   :class="[(inputSize === 'sm' ? 'h-5 w-5' : 'h-6 w-6'), 'text-slate-500']"/>
      </div>
      <div v-if="type === 'email'"
           class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MailIcon :class="[(inputSize === 'sm' ? 'h-5 w-5' : 'h-6 w-6'), 'text-slate-500']"/>
      </div>
      <div v-if="hasSelect" class="absolute inset-y-0 left-0 flex items-center">
        <TomSelectInline :options="{ placeholder: selectPlaceholder, ...plugins}" :id="name" v-model="selectedValue"
                         class="w-24"
                         :inlineSelect="true"
                         :class="[(errors.length ? 'border-danger' : ''),(!searchable ? 'no-input' : ''), '']">
          <option v-for="item in selectData" :key="item[$attrs.labelValue]" :value="item[$attrs.keyValue]">
            {{ item[$attrs.labelValue] }}
          </option>
        </TomSelectInline>
      </div>

      <input v-model="value"
             :id="name"
             :class="[
                (icon || type === 'email' ? 'pl-12' : ''),
                (inputSize === 'lg' ? 'form-control-lg' : ''),
                (inputSize === 'sm' ? 'form-control-sm' : ''),
                (type === 'url' ? 'pl-16' : ''),
                (currency ? 'pr-6' : ''),
                (hasSelect && $attrs.selectImgValue != null ? 'pl-32' : ''),
                (hasSelect && $attrs.selectImgValue == null  ? 'pl-28' : ''),
                (errors.length ? 'border-danger' : '')
              ]"
             :disabled="disabled"
             :name="name"
             :placeholder="placeholder"
             :readonly="readonly"
             :required="required"
             :type="type"
             class="form-control w-full"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span v-if="currency" :id="name" class="sm:text-sm text-slate-500">
          {{ $attrs.currencyLable }}
        </span>
      </div>
    </div>

    <!--    <div v-if="['number' , 'text'].includes(type)">-->
    <!--      <label v-if="label != null || label !== ''" :for="name" class="form-label">{{ label }}</label>-->
    <!--      <input-->
    <!--        v-model="value"-->
    <!--        :id="name"-->
    <!--        :type="type"-->
    <!--        class="form-control w-full"-->
    <!--        :class="[errors.length ? 'border-danger' : '']"-->
    <!--        :placeholder="placeholder"-->
    <!--      />-->


    <!--    </div>-->
    <!--    <div v-if="['select', 'multi-select'].includes(type)">-->
    <!--      <label :for="name" class="form-label">{{ label }}</label>-->
    <!--      <TomSelect :options="{ placeholder: placeholder, ...plugins}" :id="name" v-model="value" class="w-full"-->
    <!--                 :class="[errors.length ? 'border-danger' : '']" :multiple="type == 'multi-select'">-->
    <!--        <option v-for="item in selectData" :key="item[$attrs.labelValue]" :value="item[$attrs.keyValue]">-->
    <!--          {{ item[$attrs.labelValue] }}-->
    <!--        </option>-->
    <!--      </TomSelect>-->
    <!--    </div>-->

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
  name: "InputField",
  props: {
    flexTitle: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    inputSize: {
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
    selectedId: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    selectPlaceholder: {
      type: String,
      default: "",
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hasSelect: {
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
    validator: {
      type: Array,
      default: [],
    },
    icon: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      default: 'UsersIcon',
    },
    modelValue: {
      type: Object,
      default: null,
    },
    selectData: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      value: null,
      selectedValue: null,
    }
  },
  watch: {
    modelValue: function (value) {
      this.value = value;
    },
    selectedId: function (value) {
      this.selectedValue = value;
    },
    value: {
      handler(value, oldVal) {
        this.$emit('update:modelValue', this.value);
      },
      deep: true
    },
    selectedValue: {
      handler(value, oldVal) {
        this.$emit('update:selectedId', this.selectedValue);
      },
      deep: true
    },
  },
  computed: {
    plugins() {
      let ListOfPlugins = {};
      if (this.searchable) {
        ListOfPlugins.dropdown_input = {};
      }
      return {
        plugins: {
          ...ListOfPlugins
        }
      }
    },
  },
  created() {
    this.value = this.modelValue;
    if(this.selectedId){
      this.selectedValue = this.selectedId;
    }
  },
}
</script>
