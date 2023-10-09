import * as React from 'react'


export const DataDescriptionValidation = () => {
    const description = (document.querySelector("#description") as HTMLInputElement)
    const headerX = (document.querySelector("#headerX") as HTMLInputElement)
    const headerY = (document.querySelector("#headerY") as HTMLInputElement)
    const cols = (document.querySelector("#cols") as HTMLInputElement)
    const rows = (document.querySelector("#rows") as HTMLInputElement)

    let response = {status: true, msg: <div></div>}
    let elems = []
    
    if (description.value === ''){
        description.className = 'form-control is-invalid'
        elems.push(<li>Описание</li>)
    } else {
        description.className = 'form-control is-valid'
    }

    if (headerX.value === ''){
        headerX.className = 'form-control is-invalid'
        elems.push(<li>Исследуемый фактор</li>)
    } else {
        headerX.className = 'form-control is-valid'
    }

    if (headerY.value === ''){
        headerY.className = 'form-control is-invalid'
        elems.push(<li>Полученные результаты</li>)
    } else {
        headerY.className = 'form-control is-valid'
    }

    if (cols.value === '' || parseInt(cols.value) < 3){
        cols.className = 'form-control is-invalid'
        elems.push(<li>Столбцов не менее 3-х</li>)
    } else {
        cols.className = 'form-control is-valid'
    }

    if (rows.value === '' || parseInt(rows.value) < 3) {
        rows.className = 'form-control is-invalid'
        elems.push(<li>Строк не менее 3-х</li>)
    } else {
        rows.className = 'form-control is-valid'
    }
    
    if (elems.length > 0){
        response.status = false
        response.msg = <div className='alert alert-warning'>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                Заполните поля:
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <ul>{elems}</ul>
            </div>
        </div>
    </div>
    }
    return response
}