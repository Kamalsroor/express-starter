import { createToast } from 'mosha-vue-toastify'

export const toastMixin = {
    methods: {
        showToast(message, type = 'success') {
            createToast(message,
            {
                hideProgressBar: 'false',
                showIcon: 'true',
                timeout: type === 'denger' ? 8000 : 5000,
                type: type,
                transition: 'bounce',
            })
        },
    },
}