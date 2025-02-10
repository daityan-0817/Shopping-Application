const searchButton = qs('#magnifyingglass')
const searchInput = qs('#search_window')
const itemsDisplay = qs('#item_display')
const layout = qs('#layout')
const cartButton = qs('#image_cart')
const CART_NUM = 'cartnum'
const ITEM_STOCK = 'item_stock'
const defaultData = getItemData()
const newData = itemStockData()
const changeData = newData ? newData : defaultData

function itemDisplay(items) {
  
  if(items.length === 0) {

    const noItemDisplay = document.createElement('span')
    noItemDisplay.setAttribute('class', 'noitem_display')
    noItemDisplay.innerText = '検索条件に該当する商品がありません'
    itemsDisplay.appendChild(noItemDisplay)  
  }
    
  for(let item of items) {

    const soldOutItem = item.stock === 0

    const listItem = document.createElement('div')
    listItem.setAttribute('class','items')
    listItem.innerHTML = 
    ` 
    <img src="${item.image}"/>
    <di>${item.itemName}</div>
    <div>￥${item.price}</div>
    `
    itemsDisplay.appendChild(listItem)

    if(soldOutItem) {

      const soldOutMessage = document.createElement('div')
      soldOutMessage.setAttribute('class','soldout_message')
      soldOutMessage.innerText = 'sold out'
      listItem.appendChild(soldOutMessage)
    }else {

      listItem.addEventListener('click', () => {
        location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
      })
    }
  }
} 
  
itemDisplay(changeData)

searchButton.addEventListener('click', () => {

  itemsDisplay.innerHTML = ''
  
  const searchValue = searchInput.value
  const searchResult = changeData.filter(e => e.itemName.includes(searchValue))
  
  itemDisplay(searchResult)
})

function getCartNum() {
  
  const data = localStorage.getItem(CART_NUM)

  if(data) {
    const numberOfItems = document.createElement('span')
    numberOfItems.setAttribute('class','num_cart')
    numberOfItems.innerText = data
    layout.appendChild(numberOfItems)
  }
}

getCartNum()

function itemStockData() {

  const data = localStorage.getItem(ITEM_STOCK)

  return JSON.parse(data)
}
 
cartButton.addEventListener('click', () => {

  const data = localStorage.getItem(CART_NUM)

  if(data) {
    location.href = '/cart'
  }
})