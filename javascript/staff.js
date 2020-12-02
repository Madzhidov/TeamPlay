const header = document.querySelector('header')
const banner_btn = document.querySelector('#banner_btn')
let space = document.querySelector('.space')
let banner = document.querySelector('#banner')
space.style.height = getComputedStyle(header).height
banner.style.width = banner_btn.offsetWidth + 10 + 'px'
