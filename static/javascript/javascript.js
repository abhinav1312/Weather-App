
//SLIDING MECHANISM WHEN 'Today' AND 'More info' ARE CLICKED
function moreInfoClick(attr) {
    let moreInfo = attr.parentNode.children[2];
    let info = attr.parentNode.children[0];
    let detail = attr.parentNode.parentNode.children[2];

    detail.classList.add('slide');
    moreInfo.classList.remove('inactive');
    moreInfo.classList.add('active');
    info.classList.remove('active');
    info.classList.add('inactive');
}

function infoClick(attr) {
    let moreInfo = attr.parentNode.children[2];
    let info = attr.parentNode.children[0];
    let detail = attr.parentNode.parentNode.children[2];

    detail.classList.remove('slide');
    moreInfo.classList.add('inactive');
    moreInfo.classList.remove('active');
    info.classList.add('active');
    info.classList.remove('inactive');
}


//BLUR AND TRANSFORM ANIMATIONS ON CARD WHEN SCROLLED
function scrollFun() {
    let card = document.querySelectorAll('.card');

    for (let i = 0; i < card.length; i++) {
        let rect = card[i].getBoundingClientRect();
        let left = Math.ceil(100 / document.documentElement.clientWidth * rect.left);
        let right = Math.ceil(100 / document.documentElement.clientWidth * rect.right);
        if (left >= 38 && right <= 62) {
            card[i].classList.add("infocus");
        }
        else {
            card[i].classList.remove("infocus");
        }
    }
}


//About page

let cdFront = document.querySelectorAll('.card-front');
let cdBack = document.querySelectorAll('.card-back');
let btn = document.querySelectorAll('.btn');


function toggle(ele) {
    console.log(ele.parentNode.children[0]);

    let cdFront = ele.parentNode.children[0];
    let cdBack = ele.parentNode.children[1];

    if (cdFront.classList.contains('hide')) {
        cdFront.classList.remove('hide');
        cdBack.classList.add('hide')
    }
    else {
        cdFront.classList.add('hide')
        cdBack.classList.remove('hide')
    }
}