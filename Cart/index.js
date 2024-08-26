const cashResult = qs('#cash_result')
const cartDate = 'cartdate'
const cartNum = 'cartnum'
const totalCash = 'total_cash'
const customerDate = 'customer_date'
const items = qs('#item_display')
const continueShopping = qs('#continue_shopping')
const calculationResult = qs('#result')
const confirmationButton = qs('#confirm_button')
const returnToShoppingScreen = qs('#return')
const layout = qs('#layout')

function getDate() {
    
    const getItems = localStorage.getItem(cartDate)

    return JSON.parse(getItems)
}

function getTotalPrice() {
    
    const itemPrice = getDate()
    const arr = []
    let total = 0

    for(let item of itemPrice) {
        
        const price = parseInt(item.item_price)
        const quantity = parseInt(item.item_quantity)
        const totalPrice = price * quantity
        arr.push(totalPrice)
    }

    for(let i = 0; i < arr.length; i++) {
        total += arr[i]
    }

    if(total === 0) {
        location.href = '/cart-delete-all'
        localStorage.removeItem(cartDate)
        localStorage.removeItem(cartNum)
        localStorage.removeItem(totalCash)
    }

    saveTotalCashDate(total)
}

getTotalPrice()

function getCartNum() {
    
    const date = localStorage.getItem(cartNum)

    if(date) {
        const display = document.createElement('span')
        display.setAttribute('class','num_cart')
        display.innerText = JSON.parse(date)
        layout.appendChild(display)
      }

    return JSON.parse(date)
}

getCartNum()

function getTotalCashDate() {
    
    const total = localStorage.getItem(totalCash)

    return total
}

function screenDrawingItem() {
    
    const itemDate = getDate()
    const totalCashDate = getTotalCashDate()

    for(let item of itemDate) {
       
        const listItem = document.createElement('div')
        listItem.setAttribute('class', 'itemlist')
        listItem.innerHTML = `<img src="${item.item_image}"/>`
        const listItemborder = document.createElement('p')
        listItemborder.setAttribute('class', 'listitem_border')
        const itemName = document.createElement('span')
        itemName.setAttribute('class', 'item_name')
        itemName.innerText = `${item.item_name}`
        const itemSizeText = document.createElement('span')
        itemSizeText.setAttribute('class', 'itemsize_text')
        itemSizeText.innerText = 'size'
        const itemSize = document.createElement('span')
        itemSize.setAttribute('class', 'item_size')
        itemSize.innerText = `${item.item_size}`
        const itemQuantity = document.createElement('span')
        itemQuantity.innerText = `${item.item_quantity}点`
        itemQuantity.setAttribute('class', 'item_quantity')
        const itemPrice = document.createElement('span')
        itemPrice.innerText = `￥${item.item_price}`
        itemPrice.setAttribute('class', 'item_price')
        const delbutton = document.createElement('button')
        delbutton.setAttribute('type', 'button')
        delbutton.setAttribute('id', 'delbutton')
        
        items.appendChild(listItem)
        listItem.appendChild(itemQuantity)
        listItem.appendChild(itemPrice)
        listItem.appendChild(listItemborder)
        listItem.appendChild(delbutton)
        delbutton.innerText = '削除'
        listItem.appendChild(itemName)
        listItem.appendChild(itemSize)
        listItem.appendChild(itemSizeText)
        
        delbutton.addEventListener('click', () => {
            items.removeChild(listItem)
            removeItem(item.item_id)
            getItemQuantity(item.item_quantity)
            location.reload()
       }) 
    }    

    const totalText = document.createElement('p')
    totalText.setAttribute('id', 'totaltext')  
    totalText.innerText = 'Total'
    items.appendChild(totalText)
    const totalBorder = document.createElement('p')
    totalBorder.setAttribute('id', 'totalborder')
    items.appendChild(totalBorder)
    const totalCash = document.createElement('span')
    totalCash.setAttribute('id', 'totalcash')
    items.appendChild(totalCash)
    totalCash.innerText = `￥${totalCashDate}`
    const continueShoppingButton = document.createElement('button')
    continueShoppingButton.setAttribute('type', 'button')
    continueShoppingButton.setAttribute('id', 'continue_shopping_button')
    continueShoppingButton.innerText = 'ショッピングを続ける'
    items.appendChild(continueShoppingButton)

    continueShoppingButton.addEventListener('click', () => {
        location.href = '/'
    })

    const lastborder = document.createElement('p')
    lastborder.setAttribute('id', 'lastborder')
    items.appendChild(lastborder)
}

screenDrawingItem()

function getItemById(id) {
    
    const item = getDate()
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
    
    let itemquantity = getCartNum()
    let minus = parseInt(itemquantity) - parseInt(quantity)
    saveNumDate(minus)
}

function saveDate(itemdate) {
    localStorage.setItem(cartDate, JSON.stringify(itemdate))
}

function saveNumDate(quantity) {
    localStorage.setItem(cartNum, quantity)
}

function saveTotalCashDate(price) {
    localStorage.setItem(totalCash, price)
}

confirmationButton.addEventListener('click', () => {

    let radioButtonElement = ''
    const creditCardRadio = qs('#credit_card').checked
    const bankTransferRadio = qs('#bank_transfer').checked
    const cashOnDeliveryRadio = qs('#cash_on_delivery').checked

    if(creditCardRadio) {
        radioButtonElement = 'クレジットカード'
    } else if(bankTransferRadio) {
        radioButtonElement = '銀行振込'
    } else if(cashOnDeliveryRadio) {
        radioButtonElement = '代金引換'
    }

    const inputName = qs('#input_name').value
    const inputEmail = qs('#input_email').value
    const inputPostCode = qs('#input_postcode').value
    const inputPrefeCtures = qs('#input_prefectures').value
    const inputMunicipalities = qs('#input_municipalities').value

    const userinformation = [{
        username: inputName,
        usermail: inputEmail,
        userpostcode: inputPostCode,
        userprefectures: inputPrefeCtures,
        usermunicipalities: inputMunicipalities,
        userPaymentMethod: radioButtonElement,
    }]

    customerSaveDate(userinformation)

    for(let confirmation of userinformation) {

        const postcodeCheck = userinformation.every(elem => elem.userpostcode && elem.userprefectures && elem.usermunicipalities)
        const addressCheck = userinformation.some(elem => elem.userpostcode && elem.userprefectures && elem.usermunicipalities)

        if(postcodeCheck && !/^\d{3}-\d{4}$/.test(confirmation.userpostcode)) {
            const message = document.createElement('div')
            message.setAttribute('id', 'postcode_message')
            message.innerText = 'もう一度郵便番号を確認してください。'
            qs('#post_code_text').appendChild(message)
        } 
        
        if(!/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(confirmation.usermail)) {
            const message = document.createElement('div')
            message.setAttribute('id', 'email_message')
            message.innerText = '正しいメールアドレスを入力してください。'
            qs('#customer_email_text').appendChild(message)
        } 
        
        if(confirmation.username === '') {
            const message = document.createElement('div')
            message.setAttribute('id', 'username_message')
            message.innerText = 'お名前を入力してください。'
            qs('#customer_name_text').appendChild(message)
        } 
        
        if(!addressCheck) {
            const message = document.createElement('div')
            message.setAttribute('id', 'address_message')
            message.innerText = 'ご住所を入力してください。'
            qs('#municipalities_text').appendChild(message)
        } 
        
        if(!creditCardRadio && !bankTransferRadio && !cashOnDeliveryRadio) {
            const message = document.createElement('div')
            message.setAttribute('id', 'paymentmethod_message')
            message.innerText = 'お支払い方法を選択してください。'
            qs('#paymentmethod_text').appendChild(message)
        } 
        
        if(postcodeCheck && /^\d{3}-\d{4}$/.test(confirmation.userpostcode) && /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/.test(confirmation.usermail) && confirmation.username && addressCheck && creditCardRadio || bankTransferRadio || cashOnDeliveryRadio) {
                location.href = '/confirm'
        }
    }
})

function customerSaveDate(date) {
    localStorage.setItem(customerDate, JSON.stringify(date))
}

returnToShoppingScreen.addEventListener('click', () => {
    location.href = '/'
})


