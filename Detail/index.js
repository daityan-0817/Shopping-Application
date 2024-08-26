const cartDate = 'cartdate'
const cartNum = 'cartnum'
const addToCartButton = qs('#cart_button')
const cartButton = qs('#image_cart')
const quantityValue = qs('#select_num')
const sizeValue = qs('#select_size')
const returnToShoppingScreen = qs('#return')
const layout = qs('#layout')
let quantityDate = ''
let sizeDate = ''

const queryStringImage = location.search
const image = queryStringImage.split('=')[2]
const decodeImage = decodeURIComponent(image)
const listItem = document.createElement('div')
listItem.innerHTML = `<img src="${decodeImage}"/>`
qs('#img').appendChild(listItem)

const queryStringName = location.search
const itemName = queryStringName.split('=')[3]
const decodeItemName = decodeURIComponent(itemName)
qs('#content_name').innerText = decodeItemName

const queryStringPrice = location.search
const itemPrice = queryStringPrice.split('=')[4]
const decodeItemPrice = decodeURIComponent(itemPrice)
qs('#price').innerText = `￥${decodeItemPrice}(税込)`

function getCartNum() {
    
    const date = localStorage.getItem(cartNum)

    if(date) {
        const numDisplay = document.createElement('span')
        numDisplay.setAttribute('class','num_cart')
        numDisplay.innerText = parseInt(date)
        layout.appendChild(numDisplay)
      } 
}

getCartNum()

function addItemsToCart(quantity) {
    
    const date = localStorage.getItem(cartNum)

    if(date === null) {
        saveNumDate(quantity)
    } else {
        let plus = parseInt(date) + parseInt(quantity)
        saveNumDate(plus)
    }
}

function getDate() {
   
    const getItems = localStorage.getItem(cartDate)

    return getItems ? JSON.parse(getItems) : []
}

function saveDate(itemdate) {
    localStorage.setItem(cartDate, JSON.stringify(itemdate))
}

function saveNumDate(quantityDate) {
    localStorage.setItem(cartNum, quantityDate)
}

addToCartButton.addEventListener('click', () => {

    location.href = '/cart'

    const items = {
        item_id:`${Date.now()}`,
        item_image: decodeImage,
        item_name: decodeItemName,
        item_price: decodeItemPrice,
        item_quantity: quantityDate,
        item_size: sizeDate
    }

    const itemDate = getDate()
    itemDate.push(items)
    saveDate(itemDate)

    addItemsToCart(quantityDate)

    return items
})

sizeValue.addEventListener('click', () => {
     sizeDate = sizeValue.value
})

quantityValue.addEventListener('click', () => {
    
    quantityDate = quantityValue.value
    
    if(quantityDate !== '' && sizeDate !== '') {
        addToCartButton.disabled = false
    }
})

returnToShoppingScreen.addEventListener('click', () => {
    location.href = '/'
})

addToCartButton.addEventListener('click', () => {
    
    const date = localStorage.getItem(cartNum)

  if(date) {
    location.href = '/cart'
  }
})