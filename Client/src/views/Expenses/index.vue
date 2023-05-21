<template>
    <h2 class="intro-y text-lg font-medium mt-10">مصاريف عامة</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <router-link :to="{ name: 'ExpensesCreate' }" class="btn btn-primary shadow-md mr-2">جديد</router-link>
            <!-- <Dropdown>
                <DropdownToggle class="btn px-2 box">
                    <span class="w-5 h-5 flex items-center justify-center">
                        <PlusIcon class="w-4 h-4" />
                    </span>
                </DropdownToggle>
                <DropdownMenu class="w-40">
                    <DropdownContent>
                        <DropdownItem>
                            <PrinterIcon class="w-4 h-4 mr-2" /> Print
                        </DropdownItem>
                        <DropdownItem>
                            <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
                        </DropdownItem>
                        <DropdownItem>
                            <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
                        </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown> -->
            <div class="hidden md:block mx-auto text-slate-500">
                Showing {{ (pagination.currentPage * pagination.perPage) - pagination.perPage + 1 }} to {{
                    pagination.currentPage != pagination.lastPage ? (pagination.currentPage * pagination.perPage) :
                    pagination.total }} of {{ pagination.total }} entries
            </div>
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                <div class="w-56 relative text-slate-500">
                    <input type="text" class="form-control w-56 box pr-10" placeholder="Search..." />
                    <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                </div>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table class="table table-report -mt-2">
                <thead>
                    <tr>
                        <!-- <th class="whitespace-nowrap">IMAGES</th> -->
                        <th class="whitespace-nowrap">#</th>
                        <th class="whitespace-nowrap">البند</th>
                        <th class="whitespace-nowrap">المبلغ</th>
                        <th class="whitespace-nowrap">تاريخ الاستلام</th>
                        <!-- <th class="whitespace-nowrap">SLUG</th> -->
                        <!-- <th class="text-center whitespace-nowrap">STATUS</th> -->
                        <th class="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody v-if="!loading">
                    <tr v-for="(expense, Key) in expenses" :key="Key" class="intro-x">
               
                        <td class="font-medium whitespace-nowrap">
                            {{ expense._id }}
                            <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                created At: {{ $h.timeAgo(expense.createdAt)}}
                            </div>
                        </td>

                        <td>
                            <a href="" class="font-medium whitespace-nowrap">{{
                                expense.item
                            }}</a>
                     
                        </td>
                        <td class="font-medium whitespace-nowrap">جنية {{ expense.price  }} </td>
                        <td class="font-medium whitespace-nowrap">{{ $h.formatDate(expense.date , 'YYYY-MM-DD')}}</td>
                  
                        <td class="table-report__action w-56">
                            <div class="flex justify-center items-center">
                                <router-link :to="{ name: 'ExpensesEdit', params: { id: expense._id } }"
                                    class="flex items-center mr-3">
                                    <CheckSquareIcon class="w-4 h-4 mr-1" /> تعديل
                                </router-link>
                                <a class="flex items-center text-danger" href="javascript:;"
                                    @click="openConfirmationModal(expense._id)">
                                    <Trash2Icon class="w-4 h-4 mr-1" /> حذف
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- END: Data List -->
        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav class="w-full sm:w-auto sm:mr-auto">
                <ul class="pagination">
                    <li class="page-item" @click="getAllExpenses(1)" v-if="pagination.currentPage != 1">
                        <a class="page-link">
                            <ChevronsLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item" @click="getAllExpenses(pagination.currentPage - 1)"
                        v-if="pagination.currentPage != 1">
                        <a class="page-link">
                            <ChevronLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item" v-if="pagination.currentPage != 1">
                        <a class="page-link">...</a>
                    </li>
                    <li class="page-item" @click="getAllExpenses(pagination.currentPage - 1)"
                        v-if="pagination.currentPage != 1">
                        <a class="page-link">{{ pagination.currentPage - 1 }}</a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link">{{ pagination.currentPage }}</a>
                    </li>
                    <li class="page-item" @click="getAllExpenses(pagination.currentPage + 1)"
                        v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">{{ pagination.currentPage + 1 }}</a>
                    </li>
                    <li class="page-item" v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">...</a>
                    </li>
                    <li class="page-item" @click="getAllExpenses(pagination.currentPage + 1)"
                        v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">
                            <ChevronRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item" @click="getAllExpenses(pagination.lastPage)"
                        v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">
                            <ChevronsRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                </ul>
            </nav>
         
        </div>
        <!-- END: Pagination -->
    </div>
    <!-- BEGIN: Delete Confirmation Modal -->
    <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">هل انت متأكد؟</div>
                <div class="text-slate-500 mt-2">
                    هل تريد حقًا حذف هذه السجلات؟ <br /> لا يمكن التراجع عن هذه العملية.
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
                    الغاء
                </button>
                <button type="button" @click="deleteExpense(seclectedExpenseId)"
                    class="btn btn-danger w-24">حذف</button>
            </div>
        </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->
</template>
  
<script>
import ExpensesService from "@/services/ExpensesService";
import { toastMixin } from "@/mixins/toast";

export default {
    name: "expenses-list",
    mixins: [toastMixin],

    data() {
        return {
            expenses: [],
            seclectedExpenseId: null,
            pagination: {},
            deleteConfirmationModal: false,
            loading: false,
            page:1
        };
    },

    mounted() {

         const type = this.$route.params.type;
        console.log('type' , type);
        this.getAllExpenses();
    },

    methods: {
        getAllExpenses(page = null) {
            page = page ?? this.page;
            this.handelLoading(true);
            this.page = page;
            ExpensesService.getAll(page)
                .then(response => {
                    if (response.data.success === true) {
                        this.expenses = response.data.payload?.data;
                        this.pagination = response.data.payload?.pagination;
                    }
                    this.handelLoading(false);

                })
                .catch(e => {
                    this.showToast({
                        title: "Error",
                        description: e.message
                    },
                        "danger");
                    console.log(e);
                    this.handelLoading(false);

                });
        },
        deleteExpense(id) {
            this.handelLoading(true);
            ExpensesService.delete(id)
                .then(response => {
                    if (response.data.success === true) {
                        this.seclectedExpenseId = null;
                        this.deleteConfirmationModal = false;
                        this.getAllExpenses();
                        this.showToast("Expense deleted successfully!", "success");
                    } else {
                        this.showToast({
                            title: "Validation Error",
                            description: response.data.message
                        }, "danger");
                        this.handelLoading(false);

                    }

                })
                .catch(e => {
                    this.showToast({
                        title: "Error",
                        description: e.message
                    },
                        "danger");

                    console.log(e);
                    this.handelLoading(false);

                });
        },
        openConfirmationModal(id) {
            this.seclectedExpenseId = id;
            this.deleteConfirmationModal = true;
        },
        handelLoading(status) {
            this.loading = status;
        }
    },
};
</script>
  