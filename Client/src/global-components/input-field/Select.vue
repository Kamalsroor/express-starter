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
      <v-select v-model="value" class="form-control"
                :readonly="readonly"
                :placeholder="placeholder"
                :required="required"
                :name="name"
                :filterable="true"
                :filterBy="filterBy"
                :disabled="disabled"
                :multiple="multiple"
                :filter="fuseSearch"
                :label="$attrs.labelValue"
                :reduce="data => data[$attrs.keyValue]"
                :options="selectData">


        <template v-slot:option="option">


          <template v-if="hasTranslate">
            <template v-for="(local, index) in locales" :key="index">
              {{ local }} : {{ option[$attrs.labelValue][local] }} <br>
            </template>
          </template>
          <template v-else-if="hasColor">
            <span class="mr-1">{{ option[$attrs.labelValue] }}</span>  -  <span
            :style="{backgroundColor: option.hex }"
            class="inline-block whitespace-nowrap ml-1 rounded-[0.27rem] h-4 w-10  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
            ></span> 
          </template>
          <template v-else-if="hasTemplate">
            
            <slot :option="option" :labelValue="$attrs.labelValue"></slot>
          </template>

          <template v-else>
            {{ option[$attrs.labelValue] }}
          </template>
        </template>

        <template v-slot:selected-option="option">
          <template v-if="hasTranslate">
            <template v-for="(local, index) in locales" :key="index">
              {{ local }} : {{ option[$attrs.labelValue][local] }} <br>
            </template>
          </template>
          <template v-else-if="hasColor">
            <span class="mr-1">{{ option[$attrs.labelValue] }}</span>  -  <span
            :style="{backgroundColor: option.hex }"
            class="inline-block whitespace-nowrap ml-1 rounded-[0.27rem] h-4 w-10  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
            ></span>        
          </template>
          <template v-else>
            {{ option[$attrs.labelValue] }}
          </template>
        </template>
      </v-select>

     
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


import vSelect from 'vue-select'

export default {
  name: "SelectField",
  components:{
    vSelect
  },

  props: {
    flexTitle: {
      type: Boolean,
      default: false,
    },
    hasTranslate: {
      type: Boolean,
      default: false,
    },
    hasColor: {
      type: Boolean,
      default: false,
    },
    filterByList: {
      type: Array,
      default: [],
    },
    hasTemplate: {
      type: Boolean,
      default: false,
    },
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
    multiple: {
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
      locales:[],
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
  methods: {
     myChangeEvent(val) {
      // alert(val);
    },
    mySelectEvent({ id, text, selected }) {
      alert(`id: ${id}, text: ${text}, selected: ${selected}`);
    },
    changeOptions() {
      this.myOptions = this.myOptions.join(',') === options1.join(',') ? options2 : options1;
    },
    changeValue() {
      this.optionSelected = this.inputVal;
      this.optionsSelected = [this.inputVal];
    },
    ajaxChangeEvent(val) {
      // alert(val);
    },
    ajaxSelectEvent({ id, text, selected }) {
    },
    filterBy(option, label, search) {


   

      if(!this.hasTranslate){
        let hasTrue = false;
        for (const [key, value] of Object.entries(this.filterByList)) {
          hasTrue = (this.$h.isset(option[value]) ? option[value] : '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1

          if(hasTrue){
            return hasTrue;
          }
        }

        
        return (label || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      }else{

        let searchQuery = false ;
        for (const [key, value] of Object.entries(label)) {

          searchQuery = ((value || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1) == true ? true: searchQuery
        }

        return searchQuery
      }



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
    this.locales = window.locales;

    if(this.multiple){
      this.value = [];
    }

    this.value = this.modelValue;

  },
}
</script>
