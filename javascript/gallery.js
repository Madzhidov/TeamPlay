const littlePhoto = [
    'img/Gallery/horse-1.jpg',
    'img/Gallery/horse-2.jpg',
    'img/Gallery/horse-3.jpg',
    'img/Gallery/horse-4.jpg',
    'img/Gallery/horse-5.jpg',
    'img/Gallery/horse-6.jpg'
]

const thumbnails = document.querySelectorAll('.thumbnail')
const big_photo = document.querySelector('#main_photo')
for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', function () {
        let thumbnail_active = document.querySelector('.active')
        big_photo.src = littlePhoto[i]
        thumbnail_active.classList.remove('active')
        this.classList.add('active')
    })
}