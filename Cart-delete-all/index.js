const returnToShoppingButton = qs('#return_shopping')
const returnToShoppingScreen = qs('#return')

returnToShoppingScreen.addEventListener('click', () => {
    location.replace('/')
})

returnToShoppingButton.addEventListener('click', () => {
    location.replace('/')
})