let switch_buttons_texts = new Map()
let popular_pos = null
var i = 0
var switch_buttons = document.querySelector('.switch-buttons')
const item_lists = document.querySelectorAll('.item-list')
switch_buttons.childNodes.forEach(child => {
    if (child.textContent.replaceAll(/[\s\n]*/g, '') != '') {
        if (child.textContent.replaceAll(' ', '').toLowerCase() != 'популярное')
            switch_buttons_texts.set(child.textContent.toLowerCase(), i)
        else
            popular_pos = i
        i += 1
    }
})


/*Create item cart from json.obj*/
const createCard = function (obj) {
    let span_el = document.createElement('span')
    span_el.className = 'description-title'
    span_el.textContent = obj.name
    let div_el = [document.createElement('div'), document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')]
    div_el[0].className = 'item';
    div_el[1].className = 'wrapper';
    div_el[2].classList.add('item-description', 'hidden');
    div_el[3].className = 'cost';
    div_el[3].textContent = obj.cost
    div_el[2].textContent = obj.description
    div_el[2].prepend(div_el[3], span_el)
    let img = [document.createElement('img'), document.createElement('img')]
    img[0].className = 'info-img'
    obj.onHover === null ?
        img[1].classList.add('item-img') :
        img[1].classList.add('item-img', obj.onHover.name)
    img[0].src = 'img/main/info_icon.svg'
    img[1].src = obj.img

    div_el[1].append(img[1])

    div_el[0].append(img[0], div_el[1], div_el[2])


    info_iconClickHandler(img[0])
    return div_el[0]
}

$.getJSON('./JSONS/items.json').done(function (data) {
    data['items'].forEach(el => {
        try {
            let newItem = createCard(el)
            item_lists[switch_buttons_texts.get(el.section.toLowerCase())].append(newItem)
            if (el.popular) {
                try {
                    let clonedNode = newItem.cloneNode(true)
                    info_iconClickHandler(clonedNode.querySelector('.info-img'))
                    item_lists[popular_pos].append(clonedNode)
                } catch (e) {
                    console.error("Не обноружена секция 'Популярное'. Element в items.json" + " имеет своство popular")
                    console.error(el)
                }
            }
        } catch (e) {
            console.error(e.message)
            console.error('Проверьте items.json. Ошибка в элементе: ')
            console.error(el)
            console.warn("Возможные имена секций:")
            console.error(switch_buttons_texts.keys())
        }
    })

    data['sales'].forEach(s => {
        item_lists[switch_buttons_texts.size + 1].append(createCard(s))
    })

    data['onHover'].forEach(f => {
        hover_handler(f)
    })
})



