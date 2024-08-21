const Return_to_shopping_button = qs('#Return_to_shopping')
const Return_to_ShoppingScreen = qs('#return')

Return_to_ShoppingScreen.addEventListener('click', () => {
    location.replace('http://127.0.0.1:5500/index.html')
})

Return_to_shopping_button.addEventListener('click', () => {
    location.replace('http://127.0.0.1:5500/index.html')
})