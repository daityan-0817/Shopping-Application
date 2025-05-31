const items = qs('#item_display')
const cartDate = 'cartdate'
const cartNum = 'cartnum'
const totalCash = 'total_cash'
const customerDate = 'customer_date'
const itemStock = 'item_stock'
const orderConfirmedButton = qs('#order_confirmed')
const returnToCartButton = qs('#return_cart')
const returnToShoppingScreen = qs('#return')
const cartButton = qs('#image_cart')

const additionStock = __item_data.map((elem) => {
    
    elem.stock = 3

    return elem
})

function saveAdditionStockDate() {
    
    const additionStockDate = localStorage.setItem(itemStock, JSON.stringify(additionStock))

    return additionStockDate
}

saveAdditionStockDate()

function getItemStock() {
    
    const date = localStorage.getItem(itemStock)

    return JSON.parse(date)
}

function getCartDate() {
    
    const date = localStorage.getItem(cartDate)

    return JSON.parse(date)
}

function getCartNum() {
    
    const date = localStorage.getItem(cartNum)

    return qs('.num_cart').innerText = date
} 

getCartNum()

function getTotalCashDate() {
    
    const date = localStorage.getItem(totalCash)

    return date
}

function getCustomerDate() {
    
    const date = localStorage.getItem(customerDate)

    return JSON.parse(date)
}

function screenDrawingItem() {
    
    const itemdate = getCartDate()
    const totalCashDate = getTotalCashDate()
    const customerdate = getCustomerDate()

    for(let item of itemdate) {
        
        const listItem = document.createElement('div')
        listItem.setAttribute('class', 'itemlist')
        listItem.innerHTML =  `<img src="${item.item_image}"/>`
        const itemPrice = document.createElement('span')
        itemPrice.setAttribute('class', 'item_price')
        itemPrice.innerText = `￥${item.item_price}`
        itemSize = document.createElement('div')
        itemSize.setAttribute('class', 'item_size')
        itemSize.innerText = `size ${item.item_size}`
        const itemName = document.createElement('div')
        itemName.setAttribute('class', 'item_name')
        itemName.innerText = `${item.item_name}`
        const listItemBorder = document.createElement('p')
        listItemBorder.setAttribute('class', 'listitem_border')
        const itemQuantity = document.createElement('span')
        itemQuantity.innerText = `${item.item_quantity}点`
        itemQuantity.setAttribute('class', 'item_quantity')
        
        items.appendChild(listItem)
        items.appendChild(itemPrice)
        items.appendChild(itemSize)
        items.appendChild(listItemBorder)
        items.appendChild(itemQuantity)
        items.appendChild(itemName)
    }

    const totaltext = document.createElement('p')
    totaltext.setAttribute('id', 'totaltext')  
    totaltext.innerText = 'Total'
    items.appendChild(totaltext)
    const totalborder = document.createElement('p')
    totalborder.setAttribute('id', 'totalborder')
    items.appendChild(totalborder)
    const totalCashText = document.createElement('span')
    totalCashText.setAttribute('id', 'totalcash')
    items.appendChild(totalCashText)
    totalCashText.innerText = `￥${totalCashDate}`

    for(let customer of customerdate) {
        
        const customername = document.createElement('span')
        customername.setAttribute('class', 'customer_name')
        customername.innerText = `${customer.username}`
        qs('#customer_informationtext_name').appendChild(customername)
        const customermail = document.createElement('span')
        customermail.setAttribute('class', 'customer_mail')
        customermail.innerText = `${customer.usermail}`
        qs('#customer_informationtext_mail').appendChild(customermail)
        const customerpostcode = document.createElement('span')
        customerpostcode.setAttribute('class', 'customer_postcode')
        customerpostcode.innerText = `〒 ${customer.userpostcode}`
        qs('#customer_informationtext_postcode').appendChild(customerpostcode)
        const customerAddress = document.createElement('span')
        customerAddress.setAttribute('class', 'customer_address')
        customerAddress.innerText = `${customer.usermunicipalities}`
        qs('#customer_informationtext_address').appendChild(customerAddress)
        const customerPaymentMethod = document.createElement('span')
        customerPaymentMethod.setAttribute('class', 'customer_paymentmethod')
        customerPaymentMethod.innerText = `${customer.userPaymentMethod}`
        qs('#customer_information_paymentmethod').appendChild(customerPaymentMethod)
    }
}

screenDrawingItem()

function itemStockMinus() {
    
    const stockDate = getItemStock()
    const itemDate = getCartDate()

    for(let item of itemDate) {

        const minus = stockDate.map((elem) => {
        
            elem.stock = elem.itemName === item.item_name ? parseInt(elem.stock) - parseInt(item.item_quantity) : elem.stock

            return elem
        })     
        
        localStorage.setItem(itemStock, JSON.stringify(minus))
    }
}

itemStockMinus()

orderConfirmedButton.addEventListener('click', () => {
    
    location.href = '/completed'
    localStorage.removeItem(cartDate)
    localStorage.removeItem(cartNum)
    localStorage.removeItem(customerDate)
    localStorage.removeItem(totalCash)
})

returnToCartButton.addEventListener('click', () => {
    
    history.back()
    localStorage.removeItem(itemStock)
})

returnToShoppingScreen.addEventListener('click', () => {
    
    location.href = '/'
    localStorage.removeItem(itemStock)
})

cartButton.addEventListener('click', () => {
    
    history.back()
    localStorage.removeItem(itemStock)
})