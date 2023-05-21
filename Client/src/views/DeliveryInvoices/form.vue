<template>
  <h2 class="intro-y text-lg font-medium mt-10">{{ editMode ? 'تعديل فاتورة الاستلام' : 'فاتورة استلام جديدة' }}</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 lg:col-span-12"> <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5">
        <div class="mt-3">
          <label for="crud-form-3" class="form-label">تاريخ التسيلم</label>
            <input
              id="crud-form-3"
              type="date"
              v-model="deliveryInvoice.date"
              class="form-control"
              placeholder="date"
              aria-describedby="input-group-1"
            />
        </div>

        <div class="mt-3 grid grid-cols-12">
          <SelectField v-model="deliveryInvoice.customer"  labelValue="name" keyValue="id"
          :selectData="customers" :hasTemplate="true" class="col-span-12 lg:col-span-12" label="ألعميل" name="customers"
          placeholder="اختار العميل من فضلك" v-slot="{ option, labelValue }" :filterByList="['name','phone','email']">
          {{ option[labelValue] }} - {{ option.phone }}
          
        </SelectField>

        <div
        class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left col-span-12 lg:col-span-6"
      >
        <div>
          <div class="text-base text-slate-500">بيانات العميل</div>
          <div v-if="selectedCustomer" class="text-lg font-medium text-primary mt-2">
            {{ selectedCustomer.name }}
          </div>
          <div v-if="selectedCustomer" class="mt-1"> {{ selectedCustomer.email }}</div>
          <div v-if="selectedCustomer" class="mt-1"> {{ selectedCustomer.phone }}</div>
        </div>
      </div>
      <div
      class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left col-span-12 lg:col-span-6"
    >
      <div>
        <div class="text-base text-slate-500">المتبقي للعميل</div>
        <div v-if="selectedCustomer" v-for="(color, index) in selectedCustomer.colors" :key="index" class="text-lg font-medium text-primary mt-2">
          {{ color.name }} -  <span
          :style="{backgroundColor: color.hex }"
          class="inline-block whitespace-nowrap ml-1 rounded-[0.27rem] h-4 w-10  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
          ></span>   :=> {{ color.currentQuantity }} 
        </div>
      </div>
    </div>
    </div>

    <div class="z-0 col-span-12 overflow-auto lg:overflow-visible">
      <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th>
                <label for="crud-form-3" class="form-label">.</label>

              </th>
            </tr>
              <tr>
                <th class="whitespace-nowrap">الكمية (بالكيلو)</th>
                  <th class="whitespace-nowrap">اللون</th>
                  <th class="whitespace-nowrap">الهالك (بالكيلو)</th>
                  <th class="whitespace-nowrap">السعر</th>
                  <th class="whitespace-nowrap">#</th>
              </tr>
          </thead>
          <tbody v-if="selectedCustomer">
              <tr v-for="(item, Key) in deliveryInvoice.items" :key="Key" class="">
                  <td class="table-report__action w-56">
                    <div class="input-group">
                      <input
                        id="crud-form-3"
                        type="number"
                        min="1"
                        v-model="item.quantity"
                        class="form-control"
                        placeholder="ادخل الكمية بالكيلو"
                        aria-describedby="input-group-1"
                      />
                      <div id="input-group-1" class="input-group-text">كيلو</div>
                    </div>
                  </td>
                  <td class="table-report__action w-56">
                    <SelectField v-model="item.color" v-if="!loading"  labelValue="name" keyValue="_id"
                    :selectData="selectedCustomer.colors" :hasColor="true" class="col-span-12 sm:col-span-6" name="colors"
                    placeholder="اختار اللون من فضلك" />
                  </td>
                  <td class="table-report__action w-56">
                    <div class="input-group">
                      <input
                        id="crud-form-3"
                        type="number"
                        min="1"
                        v-model="item.outOfStock"
                        class="form-control"
                        placeholder="ادخل الكمية بالكيلو"
                        aria-describedby="input-group-1"
                      />
                      <div id="input-group-1" class="input-group-text">كيلو</div>
                    </div>
                  </td>
                  <td class="table-report__action w-56">
                    <div class="input-group">
                      <input
                        id="crud-form-3"
                        type="number"
                        min="1"
                        v-model="item.price"
                        class="form-control"
                        placeholder="ادخل الكمية بالكيلو"
                        aria-describedby="input-group-1"
                      />
                      <div id="input-group-1" class="input-group-text">كيلو</div>
                    </div>
                  </td>
                  <td class="table-report__action w-56">
                    <a v-if="Key === 0" class="flex items-center text-success" href="javascript:;"
                      @click="addItemRow()">
                      <CheckSquareIcon class="w-4 h-4 mr-1" /> اضافة
                    </a>
                    <a v-if="Key !== 0" class="flex items-center text-danger" href="javascript:;"
                      @click="removeRow(Key)">
                      <Trash2Icon class="w-4 h-4 mr-1" /> حذف
                    </a>
                </td>
              </tr>
          </tbody>
      </table>
  </div>

        <!-- <div class="mt-3">
        
        </div>
        <div class="mt-3">
          <label for="crud-form-3" class="form-label">ألكمية</label>
         
        </div> -->
  


        <div class="mt-3 relative  items-stretch flex-grow focus-within:z-10">
          <label for="crud-form-3" class="form-label">ملاحظه</label>

          <textarea v-model="deliveryInvoice.note" 
                   name="note" rows="4" cols="50"
                   class="form-control w-full"></textarea>
      
          </div>


        <div class="text-right mt-5">
          <button type="button" @click="backToList" class="btn btn-outline-secondary w-24 mr-1">
            الغاء
          </button>
          <button type="button" @click="save" class="btn btn-primary w-24" :disabled="loading">{{ editMode ? 'تعديل' :
            'حفظ' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
    <!-- END: Form Layout -->
<script>
import DeliveryInvoicesService from "@/services/DeliveryInvoicesService";
import ColorsService from "@/services/ColorsService";
import CustomersService from "@/services/CustomersService";
import { toastMixin } from "@/mixins/toast";
export default {
  name: "deliveryInvoices-create",
  mixins: [toastMixin],
  data() {
    return {
      deliveryInvoice: {},
      colors:[],
      customers:[],
      loading: false,
      selectedCustomer: null,
      editMode: false,
    };
  },
  created() {
    this.fetchColors();
    this.fetchCustomers();
    this.deliveryInvoice = {};
    const deliveryInvoiceId = this.$route.params.id;
    if (deliveryInvoiceId) {
      this.editMode = true;
      this.fetchDeliveryInvoice(deliveryInvoiceId);
    }else{

      this.deliveryInvoice.items = [];
      this.deliveryInvoice.date = this.$h.formatDate(new Date() , 'YYYY-MM-DD');
      this.addItemRow();

    }
  },
  watch: {
    "deliveryInvoice.customer" : function (value , old) {
      if(this.$h.isset(value)){

        if(old != null){
          this.deliveryInvoice.items.forEach(item => {
            item.color = null;
          });
        }
        this.fetchCustomerById(value);
      }else{
        this.selectedCustomer = null;
      }
    },
  },
  methods: {
    addItemRow(){
      this.deliveryInvoice.items.push({
        color : null
      })
    },
    removeRow(index){
      this.deliveryInvoice.items.splice(index, 1);
    },
    fetchCustomerById(id){
      this.handelLoading(true);

      CustomersService.getOneWithColors(id).then((response) => {
          if (response.data.success === true) {
            this.selectedCustomer = response.data.payload.customer;
            this.selectedCustomer.colors = response.data.payload.colors;
            console.log(response.data);

          } else {
            this.showToast({
              title: "Validation Error",
              description: response.data.message
            },
              "danger");
          }

          this.handelLoading(false);
        });

    },

    fetchCustomers(){
      this.handelLoading(true);
      CustomersService.getAllWOP().then((response) => {
          if (response.data.success === true) {
            this.customers = response.data.payload.data;
            console.log(response.data);
          } else {
            this.showToast({
              title: "Validation Error",
              description: response.data.message
            },
              "danger");
          }

          this.handelLoading(false);
        });
    },
    fetchColors(){
      this.handelLoading(true);
      ColorsService.getAll().then((response) => {
          if (response.data.success === true) {
            this.colors = response.data.payload;

          } else {
            this.showToast({
              title: "Validation Error",
              description: response.data.message
            },
              "danger");
          }

          this.handelLoading(false);
        });
    },
    fetchDeliveryInvoice(id) {
      this.handelLoading(true);
      DeliveryInvoicesService.get(id).then((response) => {
        if (response.data.success === true) {
          this.deliveryInvoice = response.data.payload;
          this.deliveryInvoice.date = this.$h.formatDate(this.deliveryInvoice.date , 'YYYY-MM-DD');


          // setTimeout(() => {
            
          // }, );
        } else {
          this.showToast({
            title: "Validation Error",
            description: response.data.message
          },
            "danger");
        }

        this.handelLoading(false);
      }).catch((e) => {
        console.log(e);
        this.showToast({
          title: "Error",
          description: e.message
        },
          "danger");
        this.handelLoading(false);
      });
    },
    save() {
      const saveMethod = this.editMode ? "update" : "create";
      this.handelLoading(true);
      DeliveryInvoicesService[saveMethod](this.deliveryInvoice).then((response) => {
        if (response.data.success === true) {
          this.showToast("DeliveryInvoice saved successfully!",
            "success");
          this.resetForm();
          this.backToList();
        } else {
          this.showToast({
            title: "Validation Error",
            description: response.data.message
          },
            "danger");
        }
        this.handelLoading(false);
      }).catch((e) => {
        console.log(e);
        this.showToast({
          title: "Error",
          description: e.message
        },
          "danger");
        this.handelLoading(false);
      });
    },
    resetForm() {
      this.deliveryInvoice = {};
    },
    backToList() {
      this.$router.push({ name: "DeliveryInvoicesIndex" });
    },
    handelLoading(status) {
      this.loading = status;
    },
  },
};
</script>