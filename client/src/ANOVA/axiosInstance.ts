import axios from "axios"

export const ax = axios.create({
    // baseURL: 'http://10.152.183.165/main', // dev
    baseURL: 'https://anova.in-arthurs-apps.space/main', // prod
})
