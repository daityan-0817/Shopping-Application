const items = qs('#item_display')
const Cartdate = 'cartdate'
const Cart_num = 'cartnum'
const Total_cash = 'total_cash'
const Customer_date = 'customer_date'
const Item_stock = 'item_stock'
const Order_confirmed_button = qs('#Order_confirmed')
const Return_to_cart_button = qs('#Return_to_cart')
const return_ = qs('#return')
const cart_button = qs('#imagecart')

const addition_stock = __item_data.map((elem) => {
    
    elem.stock = 3

    return elem
})

function save_addition_stock_date() {
    const addition_stock_date = localStorage.setItem(Item_stock, JSON.stringify(addition_stock))

    return addition_stock_date
}

save_addition_stock_date()

function get_item_stock() {
    const date = localStorage.getItem(Item_stock)

    return JSON.parse(date)
}

function get_Cart_date() {
    const date = localStorage.getItem(Cartdate)

    return JSON.parse(date)
}

function get_Cart_num() {
    const date = localStorage.getItem(Cart_num)

    return qs('.num_cart').innerText = date
} 

get_Cart_num()

function get_Total_Cash_Date() {
    const date = localStorage.getItem(Total_cash)

    return date
}

function get_Customer_Date() {
    const date = localStorage.getItem(Customer_date)

    return JSON.parse(date)
}

function Screen_drawingItem() {
    
    const item_date = get_Cart_date()
    const total_cash = get_Total_Cash_Date()
    const customer_date = get_Customer_Date()

    for(let item of item_date) {
        
        const listItem = document.createElement('div')
        listItem.setAttribute('class', 'itemlist')
        listItem.innerHTML =  `<img src="${item.item_image}"/>`
        const Item_price = document.createElement('span')
        Item_price.setAttribute('class', 'Itemprice')
        Item_price.innerText = `￥${item.item_price}`
        Item_size = document.createElement('div')
        Item_size.setAttribute('class', 'Item_size')
        Item_size.innerText = `size ${item.item_size}`
        const Item_name = document.createElement('div')
        Item_name.setAttribute('class', 'Item_name')
        Item_name.innerText = `${item.item_name}`
        const listItemborder = document.createElement('p')
        listItemborder.setAttribute('class', 'listItemborder')
        const Itemquantity = document.createElement('span')
        Itemquantity.innerText = `${item.item_quantity}点`
        Itemquantity.setAttribute('class', 'Itemquantity')
        
        items.appendChild(listItem)
        items.appendChild(Item_price)
        items.appendChild(Item_size)
        items.appendChild(listItemborder)
        items.appendChild(Itemquantity)
        items.appendChild(Item_name)
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

    for(let customer of customer_date) {
        
        const customer_name = document.createElement('span')
        customer_name.setAttribute('class', 'customer_name')
        customer_name.innerText = `${customer.username}`
        qs('#Customer_Information_text_name').appendChild(customer_name)
        const customer_mail = document.createElement('span')
        customer_mail.setAttribute('class', 'customer_mail')
        customer_mail.innerText = `${customer.usermail}`
        qs('#Customer_Information_text_mail').appendChild(customer_mail)
        const customer_postcode = document.createElement('span')
        customer_postcode.setAttribute('class', 'customer_postcode')
        customer_postcode.innerText = `〒 ${customer.userpostcode}`
        qs('#Customer_Information_text_postcode').appendChild(customer_postcode)
        const customer_address = document.createElement('span')
        customer_address.setAttribute('class', 'customer_address')
        customer_address.innerText = `${customer.usermunicipalities}`
        qs('#Customer_Information_text_address').appendChild(customer_address)
        const customer_Payment_method = document.createElement('span')
        customer_Payment_method.setAttribute('class', 'customer_Payment_method')
        customer_Payment_method.innerText = `${customer.userPayment_method}`
        qs('#Customer_Information_Payment_method').appendChild(customer_Payment_method)
    }
}

Screen_drawingItem()

function item_stock_minus() {
    const stock_date = get_item_stock()
    const item_date = get_Cart_date()

    for(let item of item_date) {

        const minus = stock_date.map((elem) => {
            elem.stock = elem.itemName === item.item_name ? parseInt(elem.stock) - parseInt(item.item_quantity) : elem.stock

            return elem
        })     
        
        localStorage.setItem(Item_stock, JSON.stringify(minus))
    }
}

item_stock_minus()

Order_confirmed_button.addEventListener('click', () => {
    location.href = 'http://127.0.0.1:5500/Shopping_application/completed/index.html'

    localStorage.removeItem(Cartdate)
    localStorage.removeItem(Cart_num)
    localStorage.removeItem(Customer_date)
    localStorage.removeItem(Total_cash)
})

Return_to_cart_button.addEventListener('click', () => {
    history.back()
    localStorage.removeItem(Item_stock)
})

return_.addEventListener('click', () => {
    location.replace('http://127.0.0.1:5500/Shopping_application/index.html')
    localStorage.removeItem(Item_stock)
})

cart_button.addEventListener('click', () => {
    history.back()
    localStorage.removeItem(Item_stock)
})