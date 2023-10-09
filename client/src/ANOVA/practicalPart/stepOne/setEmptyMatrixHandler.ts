
export const setEmptyMatrixHandler = (rows: number, cols: number) => {
    let data = {} as any
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            data[i] = {...data[i], [`x_${i}${j}`]: ''}
        }
    }
    return data
}