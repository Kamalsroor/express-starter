<template>
  <h2 class="intro-y text-lg font-medium mt-10">{{ editMode ? 'تعديل فاتورة الاستلام' : 'فاتورة استلام جديدة' }}</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 lg:col-span-12"> <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5">
        <div class="mt-3 grid grid-cols-12">
          <SelectField v-model="receiptInvoice.customerId"  labelValue="name" keyValue="id"
          :selectData="customers" :hasTemplate="true" class="col-span-12 lg:col-span-6" label="ألعميل" name="customers"
          placeholder="اختار العميل من فضلك" v-slot="{ option, labelValue }" :filterByList="['name','phone','email']">
          {{ option[labelValue] }} - {{ option.phone }}
          
        </SelectField>

        <div
        class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left col-span-12 lg:col-span-6"
      >
        <div>
          <div class="text-base text-slate-500">بيانات العميل</div>
          <div class="text-lg font-medium text-primary mt-2">
            {{ selectedCustomer.name }}
          </div>
          <div class="mt-1"> {{ selectedCustomer.email }}</div>
          <div class="mt-1"> {{ selectedCustomer.phone }}</div>
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
                  <th class="whitespace-nowrap">#</th>
              </tr>
          </thead>
          <tbody >
              <tr v-for="(item, Key) in receiptInvoice.items" :key="Key" class="">
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
                    :selectData="colors" :hasColor="true" class="col-span-12 sm:col-span-6" name="colors"
                    placeholder="اختار اللون من فضلك" />
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
          <SelectField v-model="receiptInvoice.color"  labelValue="name" keyValue="_id"
          :selectData="colors" :hasColor="true" class="col-span-12 sm:col-span-6" label="أللون" name="colors"
          placeholder="اختار اللون من فضلك" />
        </div>
        <div class="mt-3">
          <label for="crud-form-3" class="form-label">ألكمية</label>
          <div class="input-group">
            <input
              id="crud-form-3"
              type="number"
              min="1"
              v-model="receiptInvoice.quantity"
              class="form-control"
              placeholder="ادخل الكمية بالكيلو"
              aria-describedby="input-group-1"
            />
            <div id="input-group-1" class="input-group-text">كيلو</div>
          </div>
        </div>
        <div class="mt-3">
          <label for="crud-form-3" class="form-label">تاريخ الاستلام</label>
            <input
              id="crud-form-3"
              type="date"
              v-model="receiptInvoice.date"
              class="form-control"
              placeholder="date"
              aria-describedby="input-group-1"
            />
        </div> -->


        <div class="mt-3 relative  items-stretch flex-grow focus-within:z-10">
          <label for="crud-form-3" class="form-label">ملاحظه</label>

          <textarea v-model="receiptInvoice.note" 
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
import ReceiptInvoicesService from "@/services/ReceiptInvoicesService";
import ColorsService from "@/services/ColorsService";
import CustomersService from "@/services/CustomersService";
import { toastMixin } from "@/mixins/toast";
export default {
  name: "receiptInvoices-create",
  mixins: [toastMixin],
  data() {
    return {
      receiptInvoice: {},
      colors:[],
      customers:[],
      loading: false,
      selectedCustomer: {},
      editMode: false,
    };
  },
  created() {
    this.fetchColors();
    this.fetchCustomers();
    const receiptInvoiceId = this.$route.params.id;
    if (receiptInvoiceId) {
      this.editMode = true;
      this.fetchReceiptInvoice(receiptInvoiceId);
    }else{
      this.receiptInvoice.items = [];
      this.receiptInvoice.date = this.$h.formatDate(new Date() , 'YYYY-MM-DD');
      this.addItemRow();

    }
  },
  watch: {
    "receiptInvoice.customerId" : function (value) {
      if(this.$h.isset(value)){
        this.fetchCustomerById(value);
      }
    },
  },
  methods: {
    addItemRow(){
      this.receiptInvoice.items.push({
        color : null
      })
    },
    removeRow(index){
      this.receiptInvoice.items.splice(index, 1);
    },
    fetchCustomerById(id){
      this.handelLoading(true);

      CustomersService.get(id).then((response) => {
          if (response.data.success === true) {
            this.selectedCustomer = response.data.payload;
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
    fetchReceiptInvoice(id) {
      this.handelLoading(true);
      ReceiptInvoicesService.get(id).then((response) => {
        if (response.data.success === true) {
          this.receiptInvoice = response.data.payload;
          this.receiptInvoice.date = this.$h.formatDate(this.receiptInvoice.date , 'YYYY-MM-DD');
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
      ReceiptInvoicesService[saveMethod](this.receiptInvoice).then((response) => {
        if (response.data.success === true) {
          this.showToast("ReceiptInvoice saved successfully!",
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
      this.receiptInvoice = {};
    },
    backToList() {
      this.$router.push({ name: "ReceiptInvoicesIndex" });
    },
    handelLoading(status) {
      this.loading = status;
    },
  },
};
</script>