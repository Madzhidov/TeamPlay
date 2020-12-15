let switch_buttons_texts = new Map()
let popular_pos = null
var i = 0
var switch_buttons = document.querySelector('.switch-buttons')
const feedback_messages = document.querySelector('.feedback_messages')
const item_lists = document.querySelectorAll('.item-list')
/*Find product sections*/
switch_buttons.childNodes.forEach(child => {
    if (child.textContent.replaceAll(/[\s\n]*/g, '') != '') {
        if (child.textContent.replaceAll(' ', '').toLowerCase() != 'популярное')
            switch_buttons_texts.set(child.textContent.toLowerCase(), i)
        else
            popular_pos = i
        i += 1
    }
})

/*Json Item creator*/
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

/*JSON comment creator*/
$.getJSON('./JSONS/comments.json').done(function (data) {
    let allComments = data['comments']
    for (let i = 0; i < allComments.length; i++) {
        i % 2 === 1 ? feedback_messages.append(createComment(allComments[i], true)) :
            feedback_messages.append(createComment(allComments[i], false))
    }
})

