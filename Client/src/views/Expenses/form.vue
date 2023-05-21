<template>
  <h2 class="intro-y text-lg font-medium mt-10">{{ editMode ? 'تعديل فاتورة الاستلام' : 'فاتورة استلام جديدة' }}</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 lg:col-span-12"> <!-- BEGIN: Form Layout -->
      <div class="intro-y box p-5">
   

   
        <div class="mt-3">
          <label for="crud-form-3" class="form-label">ألكمية</label>
          <div class="input-group">
            <input
              id="crud-form-3"
              type="number"
              min="1"
              v-model="expense.quantity"
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
              v-model="expense.date"
              class="form-control"
              placeholder="date"
              aria-describedby="input-group-1"
            />
        </div>


        <div class="mt-3 relative  items-stretch flex-grow focus-within:z-10">
          <label for="crud-form-3" class="form-label">ملاحظه</label>

          <textarea v-model="expense.note" 
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
import ExpensesService from "@/services/ExpensesService";
import ColorsService from "@/services/ColorsService";
import CustomersService from "@/services/CustomersService";
import { toastMixin } from "@/mixins/toast";
export default {
  name: "expenses-create",
  mixins: [toastMixin],
  data() {
    return {
      expense: {},
      colors:[],
      customers:[],
      loading: false,
      selectedCustomer: {},
      editMode: false,
    };
  },
  mounted() {
    const expenseId = this.$route.params.id;
    if (expenseId) {
      this.editMode = true;
      this.fetchExpense(expenseId);
    }else{
      this.expense.date = this.$h.formatDate(new Date() , 'YYYY-MM-DD');

    }
  },
  watch: {
    "expense.customerId" : function (value) {
      if(this.$h.isset(value)){
        this.fetchCustomerById(value);
      }
    },
  },
  methods: {
   

   
   
    fetchExpense(id) {
      this.handelLoading(true);
      ExpensesService.get(id).then((response) => {
        if (response.data.success === true) {
          this.expense = response.data.payload;
          this.expense.date = this.$h.formatDate(this.expense.date , 'YYYY-MM-DD');
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
      ExpensesService[saveMethod](this.expense).then((response) => {
        if (response.data.success === true) {
          this.showToast("Expense saved successfully!",
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
      this.expense = {};
    },
    backToList() {
      this.$router.push({ name: "ExpensesIndex" });
    },
    handelLoading(status) {
      this.loading = status;
    },
  },
};
</script>