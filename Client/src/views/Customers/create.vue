<template>
    <h2 class="intro-y text-lg font-medium mt-10">Create Customers</h2>


      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-12">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="mt-3">
              <label for="crud-form-1" class="form-label">Customer Name</label>
              <input
                v-model="customer.name"
                id="crud-form-1"
                type="text"
                class="form-control w-full"
                placeholder="Input text"
              />
            </div>
            <div class="mt-3">
                <label for="crud-form-1" class="form-label">Customer Email</label>
                <input
                  v-model="customer.email"
                  id="crud-form-1"
                  type="email"
                  class="form-control w-full"
                  placeholder="Input text"
                />
              </div>
              <div class="mt-3">
                <label for="crud-form-1" class="form-label">Customer Phone</label>
                <input
                  v-model="customer.phone"
                  id="crud-form-1"
                  type="text"
                  class="form-control w-full"
                  placeholder="Input text"
                />
              </div>
       
            <div class="text-right mt-5">
              <button type="button" @click="backToList" class="btn btn-outline-secondary w-24 mr-1">
                Cancel
              </button>
              <button type="button" @click="save"  class="btn btn-primary w-24" :disabled="loading">Save</button>
            </div>
          </div>
          <!-- END: Form Layout -->
        </div>
      </div>
</template>
  
<script>
import CustomersService from "@/services/CustomersService";
import { toastMixin } from '@/mixins/toast'


export default {
    name: "customers-create",
    mixins: [toastMixin],
    data() {
        return {
            customer: {},
            loading: false,
        };
    },
    mounted() {
    },

    methods: {
        save() {
            this.handelLoading(true);
            CustomersService.create(this.customer)
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
            this.customer = {};
        },
        backToList(){
            this.$router.push({name:'customersIndex'});
        },
        handelLoading(status){
            this.loading = status;

        }
    },
};
</script>
  