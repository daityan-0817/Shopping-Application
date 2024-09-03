const searchButton = qs('#magnifyingglass')
const searchInput = qs('#search_window')
const items = qs('#item_display')
const layout = qs('#layout')
const cartButton = qs('#image_cart')
const cartNum = 'cartnum'
const itemStock = 'item_stock'

function itemDisplay() {

  const newDate = itemStockDate()

  if(!newDate) {
    
    for(let item of __item_data) {

        const listItem = document.createElement('div')
        listItem.setAttribute('class','items')
        listItem.innerHTML = 
        ` 
        <img src="${item.image}"/>
        <di>${item.itemName}</div>
        <div>￥${item.price}</div>
        `
        items.appendChild(listItem)

        listItem.addEventListener('click', () => {
          location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
        })

        function itemDisplayClose() {
          
          items.removeChild(listItem)
          searchButton.removeEventListener('click', itemDisplayClose)
      }
          searchButton.addEventListener('click', itemDisplayClose)
    } 
  } else {

    for(let item of newDate) {

        const soldOutItem = [item.stock].includes(0)

        const listItem = document.createElement('div')
        listItem.setAttribute('class','items')
        listItem.innerHTML = 
        ` 
        <img src="${item.image}"/>
        <di>${item.itemName}</div>
        <div>￥${item.price}</div>
        `
        items.appendChild(listItem)

        if(soldOutItem) {

          const soldOutMessage = document.createElement('div')
          soldOutMessage.setAttribute('class','soldout_message')
          soldOutMessage.innerText = 'sold out'
          listItem.appendChild(soldOutMessage)
      } else {

        listItem.addEventListener('click', () => {
          location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
        })
      }
        function itemDisplayClose() {
          
          items.removeChild(listItem)
          searchButton.removeEventListener('click', itemDisplayClose)
      }
          searchButton.addEventListener('click', itemDisplayClose)
    }
  }
}

itemDisplay()

function getCartNum() {
  
  const date = localStorage.getItem(cartNum)

  if(date) {
    const display = document.createElement('span')
    display.setAttribute('class','num_cart')
    display.innerText = date
    layout.appendChild(display)
  }
}

getCartNum()

function itemStockDate() {

  const date = localStorage.getItem(itemStock)

  return JSON.parse(date)
}
 
searchButton.addEventListener('click', () => {

  const newDate = itemStockDate()
  const itemNameList = []

  if(!newDate) {

    for(let item of __item_data) {
    
      itemNameList.push(item.itemName)

      if(searchInput.value === '') {
        
        const listItem = document.createElement('div')
        listItem.setAttribute('class','items')
        listItem.innerHTML = 
        ` 
        <img src="${item.image}"/>
        <di>${item.itemName}</div>
        <div>￥${item.price}</div>
        `
        items.appendChild(listItem)

        function itemDisplayClose() {
          
          items.removeChild(listItem)
          searchButton.removeEventListener('click', itemDisplayClose)
        }
          searchButton.addEventListener('click', itemDisplayClose)

        listItem.addEventListener('click', () => {
          location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
        })
      } else if(item.itemName.includes(searchInput.value)){
        
        const listItem = document.createElement('div')
        listItem.setAttribute('class','items')
        listItem.innerHTML = 
        ` 
        <img src="${item.image}"/>
        <di>${item.itemName}</div>
        <div>￥${item.price}</div>
        `
        items.appendChild(listItem)

        function itemDisplayClose() {
          
          items.removeChild(listItem)
          searchButton.removeEventListener('click', itemDisplayClose)
          }
          searchButton.addEventListener('click', itemDisplayClose)

        listItem.addEventListener('click', () => {
          location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
        })
      }
    } 
    
    const noItem = itemNameList.some(elem => elem.includes(searchInput.value))
    
    if(searchInput.value !== '' && !noItem) {

      const noItemDisplay = document.createElement('span')
      noItemDisplay.setAttribute('class', 'noitem_display')
      noItemDisplay.innerText = '検索条件に該当する商品がありません'
      items.appendChild(noItemDisplay) 

      function noItemDisplayClose() {
          
        items.removeChild(noItemDisplay)
        searchButton.removeEventListener('click', noItemDisplayClose)
    }
        searchButton.addEventListener('click', noItemDisplayClose)
  }
}

  if(newDate) {

    for(let item of newDate) {

      const soldOutItem = [item.stock].includes(0)
      itemNameList.push(item.itemName)

      if(searchInput.value === '') {
    
        const listItem = document.createElement('div')
        listItem.setAttribute('class','items')
        listItem.innerHTML = 
        ` 
        <img src="${item.image}"/>
        <di>${item.itemName}</div>
        <div>￥${item.price}</div>
        `
        items.appendChild(listItem)

        function itemDisplayClose() {
          
          items.removeChild(listItem)
          searchButton.removeEventListener('click', itemDisplayClose)
        }
          searchButton.addEventListener('click', itemDisplayClose)

        if(soldOutItem) {
      
          const soldOutMessage = document.createElement('div')
          soldOutMessage.setAttribute('class','soldout_message')
          soldOutMessage.innerText = 'sold out'
          listItem.appendChild(soldOutMessage)
      } else {
      
          listItem.addEventListener('click', () => {
            location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
      })
    }
  } else if(item.itemName.includes(searchInput.value)){
    
      const listItem = document.createElement('div')
      listItem.setAttribute('class','items')
      listItem.innerHTML = 
      ` 
      <img src="${item.image}"/>
      <di>${item.itemName}</div>
      <div>￥${item.price}</div>
      `
      items.appendChild(listItem)

      function itemDisplayClose() {
          
        items.removeChild(listItem)
        searchButton.removeEventListener('click', itemDisplayClose)
    }
        searchButton.addEventListener('click', itemDisplayClose)

      if(soldOutItem) {
      
        const soldOutMessage = document.createElement('span')
        soldOutMessage.setAttribute('class','soldout_message')
        soldOutMessage.innerText = 'sold out'
        listItem.appendChild(soldOutMessage)
    } else {
      
        listItem.addEventListener('click', () => {
          location.href =  `/detail/?id=${item.id}&imgsrc=${item.image}=${item.itemName}=${item.price}`
      })
    }
  }
} 

  const noItem = itemNameList.some(elem => elem.includes(searchInput.value))

  if(searchInput.value !== '' && !noItem) {

      const noItemDisplay = document.createElement('span')
      noItemDisplay.setAttribute('class', 'noitem_display')
      noItemDisplay.innerText = '検索条件に該当する商品がありません'
      items.appendChild(noItemDisplay) 

      function noItemDisplayClose() {
          
        items.removeChild(noItemDisplay)
        searchButton.removeEventListener('click', noItemDisplayClose)
    }
        searchButton.addEventListener('click', noItemDisplayClose)
    }
  }
})

cartButton.addEventListener('click', () => {

  const date = localStorage.getItem(cartNum)

  if(date) {
    location.href = '/cart'
  }
})