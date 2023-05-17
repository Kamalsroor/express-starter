<template>
    <h2 class="intro-y text-lg font-medium mt-10">Create DeliveryInvoices</h2>


      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-12">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="mt-3">
              <label for="crud-form-1" class="form-label">DeliveryInvoice Name</label>
              <input
                v-model="deliveryInvoice.name"
                id="crud-form-1"
                type="text"
                class="form-control w-full"
                placeholder="Input text"
              />
            </div>
            <div class="mt-3">
                <label for="crud-form-1" class="form-label">DeliveryInvoice Email</label>
                <input
                  v-model="deliveryInvoice.email"
                  id="crud-form-1"
                  type="email"
                  class="form-control w-full"
                  placeholder="Input text"
                />
              </div>
              <div class="mt-3">
                <label for="crud-form-1" class="form-label">DeliveryInvoice Phone</label>
                <input
                  v-model="deliveryInvoice.phone"
                  id="crud-form-1"
                  type="text"
                  class="form-control w-full"
                  placeholder="Input text"
                />
              </div>
       
            <div class="text-right mt-5">
              <button type="button" @click="backToList" class="btn btn-outline-secondary w-24 mr-1">
                الغاء
              </button>
              <button type="button" @click="save"  class="btn btn-primary w-24" :disabled="loading">حفظ</button>
            </div>
          </div>
          <!-- END: Form Layout -->
        </div>
      </div>
</template>
  
<script>
import DeliveryInvoicesService from "@/services/DeliveryInvoicesService";
import { toastMixin } from '@/mixins/toast'


export default {
    name: "deliveryInvoices-create",
    mixins: [toastMixin],
    data() {
        return {
            deliveryInvoice: {},
            loading: false,
        };
    },
    mounted() {
    },

    methods: {
        save() {
            this.handelLoading(true);
            DeliveryInvoicesService.create(this.deliveryInvoice)
                .then(response => {
                    if (response.data.success === true) {
                        this.showToast('This is a success toast!', 'success')
                        this.resetForm();
                        this.backToList();
                    }else{
                        this.showToast({title: "Validtion Error" ,description: response.data.message}, 'danger')
                    }
                    this.handelLoading(false);
                })
                .catch(e => {
                    console.log(e);
                    this.showToast({title: "Error" ,description: e.message}, 'danger')
                    this.handelLoading(false);
                });
        },
        resetForm(){
            this.deliveryInvoice = {};
        },
        backToList(){
            this.$router.push({name:'deliveryInvoicesIndex'});
        },
        handelLoading(status){
            this.loading = status;

        }
    },
};
</script>
  