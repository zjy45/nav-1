const siteListCache = JSON.parse(localStorage.getItem('siteList'))
const siteHash = siteListCache || [
    {
        icon: 'A',
        url: 'https://www.acfun.cn/',
        desc: 'A站',
    },
    {
        icon: 'B',
        url: 'https://www.bilibili.com/',
        desc: 'B站',
    },
]

const icon_from_url = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')[0]
}


$('.searchButton').on('click', () => {
    let $input = $('.searchInput').val()
    window.open(`https://www.google.com/search?q=${$input}`, '_self')
})

const siteUnit = (url, icon, desc) => {
    return `<div class="site" id=${Date.parse(new Date())}>
        <div class="link">${url}</div>
        <div class="close">X</div>
        <div class="siteIcon">
            ${icon}
        </div>
        <div class="desc">
            ${desc}
        </div>
    </div>`
}

const render = () => {
    $add = $('.addSite')
    siteHash.forEach((node, index) => {
        $add.before(siteUnit(node.url, node.icon, node.desc))
    })
}


$('.siteList').on('click', (e) => {
    if ($(e.target).hasClass('close')) {
        let $site = $(e.target).closest('.site')
        let index = $(".siteList .site").index($site)
        siteHash.splice(index, 1);
        $site.remove()
    } else if ($(e.target).closest('.site')) {
        let url = $(e.target).closest('.site').find('.link').text()
        window.open(url, '_self')
    }
})

const modal = $('.modal')
const mask = $('.mask')

$('.addSite').on('click', (event) => {
    mask.removeClass('modalClose')
})

$('.addButton').on('click', (event) => {
    let url = $('.modalUrl').val()
    let desc = $('.modalDesc').val()
    if (url === '' || desc === '') {
        return window.alert('请填写完整网址和描述')
    }
    siteHash.push({
        'icon': icon_from_url(url),
        'url': url,
        'desc': desc,
    })
    $add.before(siteUnit(url, icon_from_url(url), desc))
    $('.modalUrl').val('')
    $('.modalDesc').val('')
    mask.addClass('modalClose')
})

mask.on('click', (event) => {
    mask.addClass('modalClose')
    $('.modalUrl').val('')
    $('.modalDesc').val('')
})

modal.on('click', (e) => {
    e.stopPropagation()
})


render()


window.onbeforeunload = () => {
    localStorage.setItem('siteList', JSON.stringify(siteHash))

}

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < siteHash.length; i++) {
        if (siteHash[i].icon.toLowerCase() === key) {
            window.open(siteHash[i].url, '_self')
        }
    }
})
