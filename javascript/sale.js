var switch_buttons = document.querySelector('.switch-buttons')
const switched_item_lists = document.querySelectorAll('.switched')
const info_icons = document.querySelectorAll('.info-img')
//Картинка при наведении на item в goods
const hover_handler = function (obj) {
    const wrapper = document.createElement('div')
    const animal_img = document.createElement('img')
    animal_img.className = 'animal_milk-item'
    animal_img.src = obj.src
    wrapper.classList.add('wrapper')
    wrapper.classList.add('foreground_item_img')
    wrapper.append(animal_img)
    let items = document.querySelectorAll('.item')
    let items_list = []
    let wrapper_list = []
    for (let i = 0; i < items.length; i++) {
        let tmp = items[i].getElementsByClassName('wrapper')[0].querySelector('.item-img')
        if (tmp.classList.contains(obj.name)) {
            wrapper_list.push(tmp)
            items_list.push(items[i])
        }
    }
    for (let i = 0; i < wrapper_list.length; i++) {
        wrapper_list[i].addEventListener('mouseenter', function (evt) {

            if (items_list[i].querySelector('.item-description').classList.contains('hidden')) {
                wrapper_list[i].classList.add('opacity-img')
                wrapper.classList.remove('opacity-img')
                wrapper_list[i].after(wrapper)
            } else {
                wrapper_list[i].classList.add('opacity-img')
                wrapper.classList.add('opacity-img')
                wrapper_list[i].after(wrapper)
            }
        })
        items_list[i].addEventListener('mouseleave', function (evt) {
            if (wrapper_list[i].parentElement.contains(wrapper)) {
                wrapper_list[i].classList.remove('opacity-img')
                wrapper.classList.remove('opacity-img')
                wrapper_list[i].parentElement.removeChild(wrapper)
            }
        })
    }
}




//Популярное - добавление контента

//Листенер для info_icon
const info_iconClickHandler = function (info_icon) {
    info_icon.addEventListener('click', function () {
        let all_wrapper = info_icon.parentElement.querySelectorAll('.wrapper')
        let first_wrapper = all_wrapper[0]
        let i_description = info_icon.parentElement.querySelector('.item-description')
        if (all_wrapper.length === 1) {
            if (!first_wrapper.classList.contains('opacity-img')) {
                first_wrapper.classList.add('opacity-img')
                i_description.classList.remove('hidden')
            } else {
                first_wrapper.classList.remove('opacity-img')
                i_description.classList.add('hidden')
            }
        }
        else {
            if (!first_wrapper.classList.contains('opacity-img')) {
                all_wrapper[1].classList.add('opacity-img')
                first_wrapper.classList.add('opacity-img')
                i_description.classList.remove('hidden')
            } else {
                all_wrapper[1].classList.remove('opacity-img')
                first_wrapper.classList.remove('opacity-img')
                i_description.classList.add('hidden')
            }
        }
    })
}


for (let i = 0; i < info_icons.length; i++) {
    info_iconClickHandler(info_icons[i])
}
//Листенер для "radiobutton" - его замена
for (let i = 1; i < switch_buttons.childNodes.length; i += 2) {
    switch_buttons.childNodes[i].addEventListener('click', function () {
        if (!this.classList.contains('chosen')) {
            for (let j = 1; j < switch_buttons.childNodes.length; j += 2) {
                if (!(j === i))
                    switch_buttons.childNodes[j].classList.remove('chosen')
            }
            this.classList.add('chosen')
            for (let m = 0; m < switched_item_lists.length; m++) {
                switched_item_lists[m].classList.add('hidden')
            }
        }
        switched_item_lists[(i - 1) / 2].classList.remove('hidden')
    })
}