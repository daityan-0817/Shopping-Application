const Cartdate = 'cartdate'
const Cart_num = 'cartnum'
const button = qs('#cart_button')
const cart_button = qs('#imagecart')
const quantity = qs('#Select_num')
const Size = qs('#Select_size')
const return_button = qs('#return')
const layout = qs('#Layout')
let quantity_date = ''
let size_date = ''

const queryString_image = location.search
const image = queryString_image.split('=')[3]
const decode_img = decodeURIComponent(image)
const listItem = document.createElement('div')
listItem.innerHTML = `<img src="${decode_img}"/>`
qs('#img').appendChild(listItem)

const queryString_name = location.search
const itemname = queryString_name.split('=')[5]
const decodeitem_name = decodeURIComponent(itemname)
qs('#Content_name').innerText = decodeitem_name

const queryString_price = location.search
const itemprice = queryString_price.split('=')[7]
const decodeitem_price = decodeURIComponent(itemprice)
qs('#price').innerText = `￥${decodeitem_price}(税込)`

function get_Cart_num() {
    const date = localStorage.getItem(Cart_num)

    if(date) {
        const display = document.createElement('span')
        display.setAttribute('class','num_cart' )
        display.innerText = parseInt(date)
        layout.appendChild(display)
      } 
}

get_Cart_num()

function Display_num_date(quantity) {
    
    const date = localStorage.getItem(Cart_num)

    if(date === null) {
        save_num_date(quantity)
    } else {
        let plus = parseInt(date) + parseInt(quantity)
        save_num_date(plus)
    }
}

function get_date() {
   
    const get_items = localStorage.getItem(Cartdate)

    return get_items ? JSON.parse(get_items) : []
}

function saveDate(itemdate) {
    localStorage.setItem(Cartdate, JSON.stringify(itemdate))
}

function save_num_date(quantity_date) {
    localStorage.setItem(Cart_num, quantity_date)
}

button.addEventListener('click', () => {

    location.href = 'http://localhost:5500/Cart/index.html'

    const items = {
        item_id:`${Date.now()}`,
        item_image: decode_img,
        item_name: decodeitem_name,
        item_price: decodeitem_price,
        item_quantity: quantity_date,
        item_size: size_date
    }

    const item_date = get_date()
    item_date.push(items)
    saveDate(item_date)

    Display_num_date(quantity_date)

    return items
})

Size.addEventListener('click', () => {
    size_date = Size.value
})

quantity.addEventListener('click', () => {
    quantity_date = quantity.value
    
    if(quantity_date !== '' && size_date !== '') {
        button.disabled = false
    }
})

return_button.addEventListener('click', () => {
    location.replace('http://localhost:5500/Productpage/index.html')
})

cart_button.addEventListener('click', () => {
    const date = localStorage.getItem(Cart_num)

  if(date) {
    location.href = 'http://localhost:5500/Cart/index.html'
  }
})