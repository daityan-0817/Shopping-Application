const Return_to_shopping_button = qs('#Return_to_shopping')
const Push_decoration_Return_to_shopping = qs('#return')

Push_decoration_Return_to_shopping.addEventListener('click', () => {
    location.replace('http://localhost:5500/index.html')
})

Return_to_shopping_button.addEventListener('click', () => {
    location.replace('http://localhost:5500/index.html')
})