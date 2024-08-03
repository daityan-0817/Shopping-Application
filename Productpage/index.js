const search_button = qs('#magnifyingglass')
const search_input = qs('#searchwindow')
const items = qs('#item_display')
const layout = qs('#Layout')
const cart_button = qs('#imagecart')
const Cart_num = 'cartnum'
const Item_stock = 'item_stock'

function get_Cart_num() {
  const date = localStorage.getItem(Cart_num)

  if(date) {
    const display = document.createElement('span')
    display.setAttribute('class','num_cart' )
    display.innerText = date
    layout.appendChild(display)
  }
}

get_Cart_num()

function new_arr_data() {

  const data = localStorage.getItem(Item_stock)

  return JSON.parse(data)
}
 
search_button.addEventListener('click', () => {

  const new_data = new_arr_data()

  if(!new_data) {

    const item_name_list = []

    for(let item of __item_data) {

      item_name_list.push(item.itemName)

      if(search_input.value === '') {
        
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
        location.href =  `http://127.0.0.1:5500/Detail/?Detail?id=${item.id}=/?Detail?imgsrc=${item.image}=/?Detail?name=${item.itemName}=/?Detail?price=${item.price}`
        })
      } else if(item.itemName.includes(search_input.value)){
        
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
        location.href =  `http://127.0.0.1:5500/Detail/?Detail?id=${item.id}=/?Detail?imgsrc=${item.image}=/?Detail?name=${item.itemName}=/?Detail?price=${item.price}`
        })
      }
    } 
    
    const No_item = item_name_list.some(elem => elem[0] === search_input.value)
    
    if(search_input.value !== '' && !No_item) {

      const No_item_Display = document.createElement('span')
      No_item_Display.setAttribute('class', 'No_item_Display')
      No_item_Display.innerText = '検索条件に該当する商品がありません'
      items.appendChild(No_item_Display) 
    }
}

  if(new_data) {

    const item_name_list = []

    for(let item of new_data) {

      item_name_list.push(item.itemName)
      const sold_out_item = [item.stock].includes(0)

      if(search_input.value === '') {
    
        const listItem = document.createElement('div')
        listItem.setAttribute('class','items')
        listItem.innerHTML = 
        ` 
        <img src="${item.image}"/>
        <di>${item.itemName}</div>
        <div>￥${item.price}</div>
        `
        items.appendChild(listItem)

      if(sold_out_item) {
      
        const sold_out_message = document.createElement('div')
        sold_out_message.setAttribute('class','sold_out_message')
        sold_out_message.innerText = 'sold out'
        listItem.appendChild(sold_out_message)
      } else {
      
        listItem.addEventListener('click', () => {
          location.href =  `http://127.0.0.1:5500/Detail/?Detail?id=${item.id}=/?Detail?imgsrc=${item.image}=/?Detail?name=${item.itemName}=/?Detail?price=${item.price}`
      })
    }
  } else if(item.itemName.includes(search_input.value)){
    
      const listItem = document.createElement('div')
      listItem.setAttribute('class','items')
      listItem.innerHTML = 
      ` 
      <img src="${item.image}"/>
      <di>${item.itemName}</div>
      <div>￥${item.price}</div>
      `
      items.appendChild(listItem)

      if(sold_out_item) {
      
        const sold_out_message = document.createElement('span')
        sold_out_message.setAttribute('class','sold_out_message')
        sold_out_message.innerText = 'sold out'
        listItem.appendChild(sold_out_message)
    } else {
      
        listItem.addEventListener('click', () => {
          location.href =  `http://127.0.0.1:5500/Detail/?Detail?id=${item.id}=/?Detail?imgsrc=${item.image}=/?Detail?name=${item.itemName}=/?Detail?price=${item.price}`
      })
    }
  }
} 

  const No_item = item_name_list.some(elem => elem[0] === search_input.value)

  if(search_input.value !== '' && !No_item) {

      const No_item_Display = document.createElement('span')
      No_item_Display.setAttribute('class', 'No_item_Display')
      No_item_Display.innerText = '検索条件に該当する商品がありません'
      items.appendChild(No_item_Display) 
}
}
})

cart_button.addEventListener('click', () => {

  const date = localStorage.getItem(Cart_num)

  if(date) {
    location.href = 'http://127.0.0.1:5500/Cart/index.html'
  }
})