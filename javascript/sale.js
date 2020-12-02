//Картинка при наведении на item в goods
const hover_handler = function (class_name, img_src) {
    const wrapper = document.createElement('div')
    const animal_img = document.createElement('img')
    animal_img.className = 'animal_milk-item'
    animal_img.src = img_src
    wrapper.className = 'wrapper'
    wrapper.append(animal_img)
    let items = document.querySelectorAll('.item')
    let items_list = []
    let wrapper_list = []
    for (let i = 0; i < items.length; i++) {
        let tmp = items[i].getElementsByClassName('wrapper')[0]
        if (tmp.childNodes[1].classList.contains(class_name)) {
            wrapper_list.push(tmp)
            items_list.push(items[i])
        }
    }
    for (let i = 0; i < wrapper_list.length; i++) {
        wrapper_list[i].addEventListener('mouseenter', function (evt) {

            if (items_list[i].querySelector('.item-description').classList.contains('hidden')) {
                wrapper_list[i].childNodes[1].classList.add('opacity-img')
                wrapper.classList.remove('opacity-img')
                wrapper_list[i].after(wrapper)
            } else {
                wrapper_list[i].childNodes[1].classList.add('opacity-img')
                wrapper.classList.add('opacity-img')
                wrapper_list[i].after(wrapper)
            }
        })
        items_list[i].addEventListener('mouseleave', function (evt) {
            if (wrapper_list[i].parentElement.contains(wrapper)) {
                wrapper_list[i].childNodes[1].classList.remove('opacity-img')
                wrapper.classList.remove('opacity-img')
                wrapper_list[i].parentElement.removeChild(wrapper)
            }
        })
    }
}


const item_lists = document.querySelectorAll('.switched')
const switch_buttons = document.querySelector('.switch-buttons')
//Популярное - добавление контента
item_lists[0].append(item_lists[1].childNodes[1].cloneNode(true),
    item_lists[1].childNodes[3].cloneNode(true),
    item_lists[2].childNodes[3].cloneNode(true),
    item_lists[3].childNodes[3].cloneNode(true),
    item_lists[2].childNodes[1].cloneNode(true),)
//Листенер для info_icon
const info_icons = document.querySelectorAll('.info-img')
for (let i = 0; i < info_icons.length; i++) {
    info_icons[i].addEventListener('click', function () {
        let all_wrapper = this.parentElement.querySelectorAll('.wrapper')
        let first_wrapper = all_wrapper[0]
        let i_description = this.parentElement.querySelector('.item-description')
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
//Листенер для "radiobutton" - его замена
for (let i = 1; i < switch_buttons.childNodes.length; i += 2) {
    switch_buttons.childNodes[i].addEventListener('click', function () {
        if (!this.classList.contains('chosen')) {
            for (let j = 1; j < switch_buttons.childNodes.length; j += 2) {
                if (!(j === i))
                    switch_buttons.childNodes[j].classList.remove('chosen')
            }
            this.classList.add('chosen')
            for (let m = 0; m < item_lists.length; m++) {
                item_lists[m].classList.add('hidden')
            }
        }
        item_lists[(i - 1) / 2].classList.remove('hidden')
    })
}

hover_handler('horse', 'img/horse.png')
hover_handler('camel', 'img/camel.png')
hover_handler('cow', 'img/cow.png')
hover_handler('goat', 'img/goat.png')