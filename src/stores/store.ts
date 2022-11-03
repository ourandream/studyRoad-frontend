import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', {
    state: () => {
        let userInfo = {
            id: '',
            name: 'someone',
            authorities: [] as { authority: string }[],
            schoolYear: 2020,
            role: 'student'
        }

        return {
            ...userInfo
        }
    }
})