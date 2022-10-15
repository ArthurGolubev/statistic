import { makeVar } from "@apollo/client";

export const createData = makeVar({
    show: false,
    data: {} as any,
    headerX: '',
    headerY: '',
    factors: [],
})