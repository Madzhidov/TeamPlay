

const createComment = function (obj, right=false) {
    let div_el = []
    let img_el = document.createElement('img')
    img_el.className = 'thumbnail'
    obj.thumbnail != null ? img_el.src = obj.thumbnail : img_el.src = "img/main/message-icon.jpg"
    for (let i = 0; i < 7; i += 1)
        div_el.push(document.createElement('div'))
    right === false ? div_el[0].classList.add('message','flex', 'left') : div_el[0].classList.add('message', 'right', 'flex')
    console.log(div_el[0])
    div_el[1].className = "content"
    div_el[2].className = "user"
    div_el[3].className = "user_name"
    div_el[3].textContent = obj.user_name
    div_el[4].className = "age"
    div_el[4].textContent = obj.age
    div_el[5].classList.add("mail", "hidden")
    div_el[5].textContent = obj.mail
    div_el[6].className = "context"
    div_el[6].textContent = obj.comment

    div_el[2].append(div_el[3], div_el[4], div_el[5])
    div_el[1].append(div_el[2], div_el[6])
    div_el[0].append(img_el, div_el[1])
    return div_el[0]
}