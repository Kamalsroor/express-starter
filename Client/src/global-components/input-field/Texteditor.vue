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
    <div class="relative  items-stretch flex-grow focus-within:z-10">

    <!-- <ClassicEditor v-model="value" :id="name"   :class="[
                (errors.length ? 'border-danger' : '')
              ]"
             :name="name" rows="4" cols="50"
             :placeholder="placeholder"
             :readonly="readonly"
             :required="required"
             class="form-control w-full"/> -->

             <editor
             api-key="svdymgz2yxihnoxp7djmtdwq5awpdh99ddzwfh84sllcms0x"
             class="form-control w-full"
             :class="[
                (errors.length ? 'border-danger' : '')
              ]"
              v-model="value"
             :init="{
               height: 500,
               menubar: 'insert',
               image_uploadtab: false,
               automatic_uploads: true,
               file_picker_types: 'image',
               file_picker_callback: handelUpladeFile,
               images_upload_handler: example_image_upload_handler,

               plugins: [
                 'advlist autolink lists link image charmap print preview anchor',
                 'searchreplace visualblocks code fullscreen',
                 'insertdatetime media table paste code help wordcount'
               ],
               toolbar:
                 'undo redo | formatselect | image | bold italic backcolor | \
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help'
             }"
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
 import Editor from '@tinymce/tinymce-vue'

export default {
  name: "Texteditor",
  components: {
     'editor': Editor
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
      type: Object,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      image_list: [],
    }
  },
  watch: {
    modelValue: function (value) {
      if(value == null){
        this.value = "";
      }else{
        this.value = value;
      }
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
  methods: {


    handelUpladeFile (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');



                input.onchange = function () {
                  var file = this.files[0];

                  var reader = new FileReader();
                  reader.onload = function () {
                    /*
                      Note: Now we need to register the blob in TinyMCEs image blob
                      registry. In the next release this part hopefully won't be
                      necessary, as we are looking to handle it internally.
                    */
                    var id = 'blobid' + (new Date()).getTime();
                    var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
                  };
                  reader.readAsDataURL(file);
                };

                input.click();
        },

    async getMedia() {
      await axios.get(`media`, {
        params: {
          length: 100,
          type : ['image']
        }
      })
        .then(({data}) => {
          this.image_list = [];
          data.data.forEach(this.fetchMedia);
        })
        .catch((error) => {
        });
    },
     async fetchMedia(item) {
      await this.image_list.push({
        value: item.full_url,
        title: item.file_name,
      });
    },

  },
   created() {
    this.getMedia();
    this.value = this.modelValue ?? "";
  },
}
</script>
