const searchButton = qs('#magnifyingglass')
const searchInput = qs('#search_window')
const ITEMS = qs('#item_display')
const layout = qs('#layout')
const cartButton = qs('#image_cart')
const cartNum = 'cartnum'
const itemStock = 'item_stock'
const defaultData = getItemData()
const newData = itemStockData()
const itemNameList = []
const changeData = newData ? newData : defaultData

function itemDisplay(items) {
  
  if(items.length === 0) {

    const noItemDisplay = document.createElement('span')
    noItemDisplay.setAttribute('class', 'noitem_display')
    noItemDisplay.innerText = '検索条件に該当する商品がありません'
    ITEMS.appendChild(noItemDisplay)  
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
    ITEMS.appendChild(listItem)

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

  ITEMS.innerHTML = ''
  
  const searchValue = searchInput.value
  const searchResult = changeData.filter(e => e.itemName.includes(searchValue))
  
  itemDisplay(searchResult)
})

function getCartNum() {
  
  const data = localStorage.getItem(cartNum)

  if(data) {
    const number = document.createElement('span')
    number.setAttribute('class','num_cart')
    number.innerText = data
    layout.appendChild(number)
  }
}

getCartNum()

function itemStockData() {

  const data = localStorage.getItem(itemStock)

  return JSON.parse(data)
}
 
cartButton.addEventListener('click', () => {

  const data = localStorage.getItem(cartNum)

  if(data) {
    location.href = '/cart'
  }
})