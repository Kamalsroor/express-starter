<template>
    <h2 class="intro-y text-lg font-medium mt-10">الموظفين</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <router-link :to="{ name: 'employeesCreate' }" class="btn btn-primary shadow-md mr-2">اضافة موظف</router-link>
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
                        <th class="whitespace-nowrap">id</th>
                        <th class="whitespace-nowrap">الاسم</th>
                        <th class="whitespace-nowrap">رقم الهاتف</th>
                        <!-- <th class="whitespace-nowrap">SLUG</th> -->
                        <!-- <th class="text-center whitespace-nowrap">STATUS</th> -->
                        <th class="text-center whitespace-nowrap">ACTIONS</th>
                    </tr>
                </thead>
                <tbody v-if="!loading">
                    <tr v-for="(employee, Key) in employees" :key="Key" class="intro-x">
                        <!-- <td class="w-40">
                            <div class="flex">
                                <div class="w-10 h-10 image-fit zoom-in">
                                    <Tippy tag="img" alt="Midone Tailwind HTML Admin Template" class="rounded-full"
                                        :src="faker.images[0]" :content="`Uploaded at ${faker.dates[0]}`" />
                                </div>
                                <div class="w-10 h-10 image-fit zoom-in -ml-5">
                                    <Tippy tag="img" alt="Midone Tailwind HTML Admin Template" class="rounded-full"
                                        :src="faker.images[1]" :content="`Uploaded at ${faker.dates[1]}`" />
                                </div>
                                <div class="w-10 h-10 image-fit zoom-in -ml-5">
                                    <Tippy tag="img" alt="Midone Tailwind HTML Admin Template" class="rounded-full"
                                        :src="faker.images[2]" :content="`Uploaded at ${faker.dates[2]}`" />
                                </div>
                            </div>
                        </td> -->
                        <td class="font-medium whitespace-nowrap">{{ employee._id }}</td>

                        <td>
                            <a href="" class="font-medium whitespace-nowrap">{{
                                employee.name
                            }}</a>
                            <!-- <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                Tags: {{ faker.employees[0].tags }}
                            </div> -->
                        </td>
                        <td class="font-medium whitespace-nowrap">{{ employee.phone }}</td>
                        <!-- <td>
                            <a class="text-slate-500 flex items-center mr-3" href="javascript:;">
                                <ExternalLinkIcon class="w-4 h-4 mr-2" />
                                /employees/{{ faker.employees[0].slug }}
                            </a>
                        </td>
                        <td class="w-40">
                            <div class="flex items-center justify-center" :class="{
                                'text-success': faker.trueFalse[0],
                                'text-danger': !faker.trueFalse[0],
                            }">
                                <CheckSquareIcon class="w-4 h-4 mr-2" />
                                {{ faker.trueFalse[0] ? "Active" : "Inactive" }}
                            </div>
                        </td> -->
                        <td class="table-report__action w-56">
                            <div class="flex justify-center items-center">
                                <router-link :to="{ name: 'employeesEdit', params: { id: employee._id } }"
                                    class="flex items-center mr-3">
                                    <CheckSquareIcon class="w-4 h-4 mr-1" /> تعديل
                                </router-link>
                                <a class="flex items-center text-danger" href="javascript:;"
                                    @click="openConfirmationModal(employee._id)">
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
                    <li class="page-item" @click="getAllEmployees(1)" v-if="pagination.currentPage != 1">
                        <a class="page-link">
                            <ChevronsLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item" @click="getAllEmployees(pagination.currentPage - 1)"
                        v-if="pagination.currentPage != 1">
                        <a class="page-link">
                            <ChevronLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item" v-if="pagination.currentPage != 1">
                        <a class="page-link">...</a>
                    </li>
                    <li class="page-item" @click="getAllEmployees(pagination.currentPage - 1)"
                        v-if="pagination.currentPage != 1">
                        <a class="page-link">{{ pagination.currentPage - 1 }}</a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link">{{ pagination.currentPage }}</a>
                    </li>
                    <li class="page-item" @click="getAllEmployees(pagination.currentPage + 1)"
                        v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">{{ pagination.currentPage + 1 }}</a>
                    </li>
                    <li class="page-item" v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">...</a>
                    </li>
                    <li class="page-item" @click="getAllEmployees(pagination.currentPage + 1)"
                        v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">
                            <ChevronRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item" @click="getAllEmployees(pagination.lastPage)"
                        v-if="pagination.currentPage != pagination.lastPage">
                        <a class="page-link">
                            <ChevronsRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- <select class="w-20 form-select box mt-3 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
            </select> -->
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
                <button type="button" @click="deleteEmployee(seclectedEmployeeId)"
                    class="btn btn-danger w-24">حذف</button>
            </div>
        </ModalBody>
    </Modal>
    <!-- END: Delete Confirmation Modal -->
</template>
  
<script>
import EmployeesService from "@/services/EmployeesService";
import { toastMixin } from "@/mixins/toast";

export default {
    name: "employees-list",
    mixins: [toastMixin],

    data() {
        return {
            employees: [],
            seclectedEmployeeId: null,
            pagination: {},
            deleteConfirmationModal: false,
            loading: false,
            page:1
        };
    },

    mounted() {
        this.getAllEmployees();
    },

    methods: {
        getAllEmployees(page = null) {
            page = page ?? this.page;
            this.handelLoading(true);
            this.page = page;
            EmployeesService.getAll(page)
                .then(response => {
                    if (response.data.success === true) {
                        this.employees = response.data.payload?.data;
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
        deleteEmployee(id) {
            this.handelLoading(true);
            EmployeesService.delete(id)
                .then(response => {
                    if (response.data.success === true) {
                        this.seclectedEmployeeId = null;
                        this.deleteConfirmationModal = false;
                        this.getAllEmployees();
                        this.showToast("Employee deleted successfully!", "success");
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
            this.seclectedEmployeeId = id;
            this.deleteConfirmationModal = true;
        },
        handelLoading(status) {
            this.loading = status;
        }
    },
};
</script>
  