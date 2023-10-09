

export const TableLayoutValidate = (data: any) => {

    console.log('data -> ', data)

    let isNotEmpty = true
    Object.values(data).map(row => {
        Object.entries(row).map(elem => {
            let cell = document.querySelector(`#cell-${elem[0]}`)
            if(elem[1] === '' || parseInt(elem[1]) < 0){
                cell.className = 'form-control is-invalid'
                isNotEmpty = false
            } else {
                cell.className = 'form-control is-valid'
            }
        })
    })
    
    return isNotEmpty
}