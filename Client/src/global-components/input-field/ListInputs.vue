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
    <div class="relative flex-1 items-stretch flex-grow focus-within:z-10">

    <div class="col-span-6 sm:col-span-6">
      <table class="min-w-full bg-white shadow shadow-md hover:shadow-xl  sm:rounded table-auto">
        <thead>
        <tr class="border-b border-gray-200">


          <th v-for="header in inputs"  :width="header.width"  :key="header.name"
              :class="['hidden text-left lg:table-cell' , headWidth(header.width)]">
            <span class="inline-block p-2 font-normal text-blue-600 lg:text-sm">{{ header.label }}</span>
          </th>
          <th class="hidden w-24 text-left lg:table-cell">
            <span class="inline-block p-2 font-normal text-blue-600 lg:text-sm">Action</span>
          </th>
        </tr>
        </thead>
        <tbody>
            <tr class="align-top group" v-for="(list  , index) in listValue" :key="list" >

              <template v-for="input in inputs" :key="input.name">

                <td  :class="['hidden  text-left lg:table-cell'  , headWidth(input.width)]">


                            <div v-if="input.type == 'text'">
                              <InputField   :id="input.name" v-model="listValue[index][input.name]" class="col-span-12 sm:col-span-12"
                                  :label="input.label" :name="input.name" :placeholder="input.placeholder"/>
                            </div>
                            <div v-if="input.type == 'number'">
                              <InputField   :id="input.name" type="number" v-model="listValue[index][input.name]" class="col-span-12 sm:col-span-12"
                                  :label="input.label" :name="input.name" :placeholder="input.placeholder"/>
                            </div>
                            <div v-if="input.type == 'radio'">
                              <Switch v-model="listValue[index][input.name]" :name="input.name" class="col-span-12 sm:col-span-12"
                                    :label="input.label" />
                            </div>
                            <div v-if="input.type == 'texteditor'">
                              <InputTexteditor v-model="listValue[index][input.name]"   class="col-span-12 sm:col-span-12"
                                  :label="input.label" :name="input.name" :placeholder="input.placeholder"/>

                                <div v-if="input.merge_tags" class="w-full flex justify-center border-t border-slate-200/60 dark:border-darkmode-400 mt-2">
                                    <div class="bg-white dark:bg-darkmode-600 px-5 -mt-3 text-slate-500">
                                        Tags
                                    </div>
                                </div>
                                  <ul v-if="input.merge_tags">
                                    <li v-for="(tag , index) in input.merge_tags" :key="index" class="text-primary block font-extrabold" :class="{ 'flex' : !tag.mergeTags }">
                                      {{ tag.name }}
                                      <div v-if="tag.mergeTags">
                                        : [
                                        <li class="px-4 text-slate-600 dark:text-slate-500 block" v-for="(subTag , subIndex) in tag.mergeTags" :key="subIndex">
                                          {{ subTag.name }}  : {{ subTag.value }}
                                        </li>
                                        ]
                                      </div>
                                      <div v-else>
                                        <span class="ml-2 text-slate-600 dark:text-slate-500 block"> : {{ tag.value }}</span>
                                      </div>
                                    </li>
                                  </ul>
                              <div class="inline-flex rounded-md shadow">
                                  <a v-if="input.show_example" :href="input.show_example" target="_blank" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Show Example </a>
                              </div>


                            </div>
                            <div v-if="input.type == 'textarea'">
                              <InputTextarea v-model="listValue[index][input.name]"   class="col-span-12 sm:col-span-12"
                                  :label="input.label" :name="input.name" :placeholder="input.placeholder"/>
                            </div>
                            <div v-if="input.type == 'img'">
                                <FileUploader  :acceptedFileTypes="input.file_types ?? ['all']" :label="input.label" v-model="listValue[index][input.name]" class="col-span-12 sm:col-span-12" max="1"/>
                            </div>

                </td>

              </template>

              <td class="w-24">
                  <button v-if="index != 0" class="float-left" type="button" @click="RemoveRow(index)">
                    <jet-button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-rose-100 hover:text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                type="button">
                      Remove
                    </jet-button>
                  </button>
                </td>

            </tr>

        </tbody>
      </table>





    </div>

    <button class="float-right" type="button" @click="newRow()">
      <jet-button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-green-100 hover:text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  type="button">
        Add
      </jet-button>
    </button>
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

  name: 'InputList',
  props: {

      inputs: {
        type: Array,
        default() {
          return [];
        },
      },
      errors: {
        type: Array,
        default: [],
      },
      modelValue: {
        type: Array,
        required: true,
        default() {
          return [];
        },
      },
      label: {
        type: String,
        required: false,
        default: null,
      },
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        default: null,
      },
      value: {
        validator: (prop) => typeof prop === 'string' || prop === 'number' || prop === null,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      min: {
        type: Number,
        required: false,
        default: null,
      },
      max: {
        type: Number,
        required: false,
        default: null,
      },
      maxlength: {
        type: Number,
        required: false,
        default: null,
      },
      size: {
        type: Number,
        required: false,
        default: null,
      },
      step: {
        type: Number,
        required: false,
        default: null,
      },
      pattern: {
        type: String,
        required: false,
        default: null,
      },
      placeholder: {
        type: String,
        required: false,
        default: null,
      },
      autocomplete: {
        type: String,
        required: false,
        default: null,
      },
      fieldClass: {
        type: String,
        required: false,
        default: null,
      },
      labelClass: {
        type: String,
        required: false,
        default: null,
      },
      readonly: {
        type: Boolean,
        required: false,
        default: false,
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
  },

  data() {
    return {
      listValue: this.modelValue ?? [],
    }
  },
  emits: ["update:modelValue", "closed-model"],

  watch: {
    // listValue : function (value) {
    //     this.$emit('update:modelValue', value)
    // },
    listValue: {
      handler: function (val, oldVal) {
        this.$emit('update:modelValue', val);
      },
      deep: true
    }
  },
  methods: {

    RemoveRow(index) {
      this.listValue.splice(index, 1);
    },


    newRow(){

        var formAttrs = {};
        Object.entries(this.inputs).forEach(([key, input]) => {
            formAttrs[input.name] = input.value ?? null;
        })
        this.listValue.push(formAttrs);

    },

  },
  created() {
    if(this.listValue.length == 0){
      var formAttrs = {};
      Object.entries(this.inputs).forEach(([key, input]) => {
          formAttrs[input.name] = input.value ?? null;
      })
      this.listValue.push(formAttrs);
    }
  },
  computed: {
    headWidth() {
      return (width) => 'w-'+width;
    }
  },
};
</script>
