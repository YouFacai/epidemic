import source from './source.js';
let container = document.querySelector('#container'),
    wrapper = container.querySelector('.wrapper'),
    buttonPrev = container.querySelector('.button-prev'),
    buttonNext = container.querySelector('.button-next'),
    slides = [];

// step:控制当前展示哪一个  autoTimer:自动轮播定时器
let step = 0,
    autoTimer = null;

// 数据渲染  inital=true是第一次渲染
const render = function render(inital) {
    let str = ``,
        len = source.length;

    // 控制slide的样式
    let temp1 = step - 1,
        temp2 = step ,
        temp3 = step + 1
    if (temp1 < 0) temp1 = len + temp1;
    if (temp3 > len - 1) temp3 = temp3 - len;
    source.forEach((item, index) => {
        let transform = 'translate(-50%, -50%) scale(0.55)',
            zIndex = 0,
            className = 'slide';
        switch (index) {
            case temp2:
                transform = 'translate(-50%, -50%) scale(1)';
                zIndex = 3;
                className = 'slide active';
                break;
            case temp1:
                transform = 'translate(-150%, -50%) scale(0.85)';
                zIndex = 1;
                break;
            case temp3:
                transform = 'translate(50%, -50%) scale(0.85)';
                zIndex = 2;
                break;
        }
        item.sty = `transform:${transform};z-index:${zIndex};`;
        item.className = className;
    });

    // 非第一次执行，修改slide样式
    if (!inital) {
        source.forEach((item, index) => {
            let cur = slides[index];
            cur.style = item.sty;
            cur.className = item.className;
        });
        return;
    }

    // 数据绑定
    source.forEach(item => {
        let {
            pic,
            className,
            sty,
            descript: {
                name,
                identity,
                dream
            }
        } = item;
        str += `<div class="${className}" style="${sty}">
            <img src="${pic}" alt="" />
        </div>`;
    });
    wrapper.innerHTML = str;
    slides = wrapper.querySelectorAll('.slide');
};

// 自动轮播
const autoMove = function autoMove() {
    autoTimer = setInterval(() => {
        step++;
        if (step > source.length - 1) step = 0;
        render();
    }, 2000);
};

// 延迟函数
const delay = function delay(interval) {
    if (typeof interval === "undefined") interval = 1000;
    return new Promise(resolve => {
        resolve();
    });
};
delay().then(() => {
    // 控制元素显示
    wrapper.style.opacity = 1;
    buttonPrev.style.opacity = 1;
    buttonNext.style.opacity = 1;

    // 数据渲染
    render(true);

    // 开启自动轮播
    autoMove();

   /*  // 控制自动轮播的暂停/开始
    container.onmouseenter = () => clearInterval(autoTimer);
    container.onmouseleave = () => autoMove(); */

    // 左右切换   扩展：事件委托
    buttonNext.onclick = utils.throttle(() => {
        step++;
        if (step > source.length - 1) step = 0;
        render();
    }, 1000);
    buttonPrev.onclick = utils.throttle(() => {
        step--;
        if (step < 0) step = source.length - 1;
        render();
    }, 1000);
});
