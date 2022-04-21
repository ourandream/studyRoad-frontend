import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', {
    state: () => {
        let userInfo = {
            name: '',
            username: '',
            gender: '',
            className: '',
            nation: '',
            phoneNumber: '',
            accountType: '',
            mainMajor: '',
            politicsState: '',
            address: '',
            authorities: [] as { authority: string }[]
        }

        return {
            ...userInfo
        }
    },
    getters: {
        role: (state) => {
            if (JSON.stringify(state.authorities).indexOf(JSON.stringify({ authority: "ROLE_ADMIN" })) !== -1) {
                return 'admin'
            }
            else if (JSON.stringify(state.authorities).indexOf(JSON.stringify({ authority: "ROLE_TEACHER" })) !== -1) {
                return 'teacher'
            }
            else {
                return 'student'
            }
        }
    },
    persist: {
        enabled: true
    }
})