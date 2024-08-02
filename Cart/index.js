const Cashresult = qs('#Cash_result')
const Cartdate = 'cartdate'
const Cart_num = 'cartnum'
const Total_cash = 'total_cash'
const Customer_date = 'customer_date'
const items = qs('#item_display')
const Continue_shopping = qs('#continue_shopping')
const Calculation_result = qs('#result')
const Confirmation_button = qs('#confirm_button')
const return_button = qs('#return')
const layout = qs('#Layout')

function getTotalPrice() {
    
    const itemprice = get_date()
    const arr = []
    let total = 0

    for(let item of itemprice) {
        
        const price = parseInt(item.item_price)
        const quantity = parseInt(item.item_quantity)
        const total_price = price * quantity
        arr.push(total_price)
    }

    for(let i = 0; i < arr.length; i++) {
        total += arr[i]
    }

    if(total === 0) {
        location.href = 'http://127.0.0.1:5500/Shopping_application/Cart_delete_all/index.html'

        localStorage.removeItem(Cartdate)
        localStorage.removeItem(Cart_num)
        localStorage.removeItem(Total_cash)
    }

    saveTotalCashDate(total)
}

getTotalPrice()


function get_date() {
    
    const get_items = localStorage.getItem(Cartdate)

    return JSON.parse(get_items)
}

function get_Cart_num() {
    
    const date = localStorage.getItem(Cart_num)

    if(date) {
        const display = document.createElement('span')
        display.setAttribute('class','num_cart' )
        display.innerText = JSON.parse(date)
        layout.appendChild(display)
      }

    return JSON.parse(date)
}

get_Cart_num()

function get_Total_Cash_Date() {
    const total = localStorage.getItem(Total_cash)

    return total
}


function Screen_drawingItem() {
    
    const item_date = get_date()
    const total_cash = get_Total_Cash_Date()

    for(let item of item_date) {
       
        const listItem = document.createElement('div')
        listItem.setAttribute('class', 'itemlist')
        listItem.innerHTML = `<img src="${item.item_image}"/>`
        const listItemborder = document.createElement('p')
        listItemborder.setAttribute('class', 'listItemborder')
        const Itemname = document.createElement('span')
        Itemname.setAttribute('class', 'Itemname')
        Itemname.innerText = `${item.item_name}`
        const Itemsize_text = document.createElement('span')
        Itemsize_text.setAttribute('class', 'Itemsize_text')
        Itemsize_text.innerText = 'size'
        const Itemsize = document.createElement('span')
        Itemsize.setAttribute('class', 'Itemsize')
        Itemsize.innerText = `${item.item_size}`
        const Itemquantity = document.createElement('span')
        Itemquantity.innerText = `${item.item_quantity}点`
        Itemquantity.setAttribute('class', 'Itemquantity')
        const Itemprice = document.createElement('span')
        Itemprice.innerText = `￥${item.item_price}`
        Itemprice.setAttribute('class', 'Itemprice')
        const delbutton = document.createElement('button')
        delbutton.setAttribute('type', 'button')
        delbutton.setAttribute('id', 'delbutton')
        
        items.appendChild(listItem)
        listItem.appendChild(Itemquantity)
        listItem.appendChild(Itemprice)
        listItem.appendChild(listItemborder)
        listItem.appendChild(delbutton)
        delbutton.innerText = '削除'
        listItem.appendChild(Itemname)
        listItem.appendChild(Itemsize)
        listItem.appendChild(Itemsize_text)
        
        delbutton.addEventListener('click', () => {
            items.removeChild(listItem)
            removeItem(item.item_id)
            getItemQuantity(item.item_quantity)
            location.reload()
       })
        
    }    

    const Total_text = document.createElement('p')
    Total_text.setAttribute('id', 'totaltext')  
    Total_text.innerText = 'Total'
    items.appendChild(Total_text)
    const Total_border = document.createElement('p')
    Total_border.setAttribute('id', 'totalborder')
    items.appendChild(Total_border)
    const TotalCash = document.createElement('span')
    TotalCash.setAttribute('id', 'totalcash')
    items.appendChild(TotalCash)
    TotalCash.innerText = `￥${total_cash}`
    const Continue_shopping_button = document.createElement('button')
    Continue_shopping_button.setAttribute('type', 'button')
    Continue_shopping_button.setAttribute('id', 'Continue_shopping_button')
    Continue_shopping_button.innerText = 'ショッピングを続ける'
    items.appendChild(Continue_shopping_button)

    Continue_shopping_button.addEventListener('click', () => {
        location.href = 'http://127.0.0.1:5500/Shopping_application/index.html'
    })

    const lastborder = document.createElement('p')
    lastborder.setAttribute('id', 'lastborder')
    items.appendChild(lastborder)
}

Screen_drawingItem()

function getItemById(id) {
    const item = get_date()
    const index = item.findIndex((el) => el.item_id === id)
    
    return {
        item: item[index],
        item,
        index
    } 
}

function removeItem(id) {
    const {
        index,
        item
    } = getItemById(id)

    item.splice(index, 1)

    saveDate(item)

    return item
}

function getItemQuantity(quantity) {
    let itemquantity = get_Cart_num()
    let minus = parseInt(itemquantity) - parseInt(quantity)
    console.log(minus, typeof minus)
    save_num_date(minus)
}

function saveDate(itemdate) {
    localStorage.setItem(Cartdate, JSON.stringify(itemdate))
}

function save_num_date(quantity) {
    localStorage.setItem(Cart_num, quantity)
}

function saveTotalCashDate(price) {
    localStorage.setItem(Total_cash, price)
}

Confirmation_button.addEventListener('click', () => {

    let radiobutton_element = ''
    const credit_card_radio = qs('#credit_card').checked
    const Bank_transfer_radio = qs('#Bank_transfer').checked
    const cash_on_delivery_radio = qs('#cash_on_delivery').checked

    if(credit_card_radio) {
        radiobutton_element = 'クレジットカード'
    } else if(Bank_transfer_radio) {
        radiobutton_element = '銀行振込'
    } else if(cash_on_delivery_radio) {
        radiobutton_element = '代金引換'
    }

    const InputName = qs('#input_name').value
    const InputEmail = qs('#input_email').value
    const InputPostCode = qs('#input_PostCode').value
    const InputPrefeCtures = qs('#input_prefectures').value
    const InputMunicipalities = qs('#input_municipalities').value

    
    const userinformation = [{
        username: InputName,
        usermail: InputEmail,
        userpostcode: InputPostCode,
        userprefectures: InputPrefeCtures,
        usermunicipalities: InputMunicipalities,
        userPayment_method: radiobutton_element,
    }]

    Customer_save_date(userinformation)


    for(let confirmation of userinformation) {

        const postcode_check = userinformation.every(elem => elem.userpostcode && elem.userprefectures && elem.usermunicipalities)
        const address_check = userinformation.some(elem => elem.userpostcode && elem.userprefectures && elem.usermunicipalities)

        if(postcode_check && !/^\d{3}-\d{4}$/.test(confirmation.userpostcode)) {
            const message = document.createElement('div')
            message.setAttribute('id', 'postcode_message')
            message.innerText = 'もう一度郵便番号を確認してください。'
            qs('#post_code_text').appendChild(message)
        } 
        
        if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(confirmation.usermail)) {
            const message = document.createElement('div')
            message.setAttribute('id', 'email_message')
            message.innerText = '正しいメールアドレスを入力してください。'
            qs('#Customer_email_text').appendChild(message)
        } 
        
        if(confirmation.username === '') {
            const message = document.createElement('div')
            message.setAttribute('id', 'username_message')
            message.innerText = 'お名前を入力してください。'
            qs('#Customer_name_text').appendChild(message)
        } 
        
        if(!address_check) {
            const message = document.createElement('div')
            message.setAttribute('id', 'address_message')
            message.innerText = 'ご住所を入力してください。'
            qs('#municipalities_text').appendChild(message)
        } 
        
        if(!credit_card_radio && !Bank_transfer_radio && !cash_on_delivery_radio) {
            const message = document.createElement('div')
            message.setAttribute('id', 'Payment_method_message')
            message.innerText = 'お支払い方法を選択してください。'
            qs('#Payment_method_text').appendChild(message)
        } 
        
        if(postcode_check && /^\d{3}-\d{4}$/.test(confirmation.userpostcode) && /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(confirmation.usermail) && confirmation.username && address_check && credit_card_radio || Bank_transfer_radio || cash_on_delivery_radio) {
                location.href = 'http://127.0.0.1:5500/Shopping_application/confirm/index.html'
        }
    }
})

function Customer_save_date(date) {
    localStorage.setItem(Customer_date, JSON.stringify(date))
}

return_button.addEventListener('click', () => {
    location.replace('http://127.0.0.1:5500/Shopping_application/index.html')
})


