~function () {
    // 点击播放按钮放歌
    let timer = null,
        Deg = 0,
        // 病毒list
        virusList = outvirus.getElementsByClassName('outvirus_img');
    const playMusic = function playMusic(init) {
        // 取出标识 更换图片 1正在播放 0停止
        let state = /(\d)_music/.exec(GoMusic_img.src)[1];
        if (init) state = +!Number(state)
        GoMusic_img.src = `./public/img/${state}_music.png`;
        // 如果改了后是1 图标旋转  音乐播放
        isPlay(state);
    }

    // 播放和旋转 
    const isPlay = function isPlay(state) {
        if (state) {
            timer = clearTimer(timer);
            timer = setInterval(() => {
                GoMusic.style.transform = `rotate(${Deg++}deg)`
            }, 10)
            GOaudio.play();
        } else {
            timer = clearTimer(timer);
            clearInterval(timer);
            GOaudio.pause();
        }
    }

    // 清除定时器
    const clearTimer = function (timer) {
        clearInterval(timer);
        return null;
    }

    // 点击中国加油
    document.getElementsByClassName('entrance')[0].addEventListener('click', () => {
        typer();
        return fadeOver(homepage, referral)
    })

    // 切换淡出效果
    const fadeOver = function (quit, enter) {
        quit.style.opacity = 0;
        enter.style.opacity = 1;
        setTimeout(() => {
            quit.style.zIndex = 1;
            enter.style.zIndex = 2;
        }, 2000);
    }

    // 打字机效果
    const typer = function typer() {
        fetch('./public/data.json').then((res) => {
            return res.json()
        }).then((res) => {
            let str = res;
            let timer = null;
            setTimeout(() => {
                timer = setInterval(() => {
                    let tempStr = str.slice(0, 1);
                    str = str.slice(1);
                    font_content.innerHTML += tempStr;
                    if (str.length === 0) {
                        clearInterval(timer);
                        timer = null;
                        // 显示更多
                        more.style.display = 'block'
                        more.style.width
                        more.style.opacity = 1;
                    }
                }, 10);
            }, 3000);
        })
    }

    // 第二个页面点击更多 跳转
    const tapmore = function tapmore() {
        fadeOver(referral, gameList)
    }

    // (地图)点击按钮返回
    chainMap.getElementsByClassName("leftBoult")[0].onclick = function () {
        fadeOver(chainMap, gameList);
    }

    // (病毒)点击按钮返回
    outvirus.getElementsByClassName("leftBoult")[0].onclick = function () {
        fadeOver(outvirus, gameList);
    }

    // 消灭病毒/拾取物品 模块
    // 点击病毒病毒消失
    const clearvirus = function clearvirus(NodeList) {
        // 计数
        let count = 0;
        NodeList = Array.from(NodeList);
        NodeList.forEach((item, index) => {
            item.onclick = function (e) {
                outvirus.getElementsByClassName('integral')[0].innerHTML = `消灭:${++count}`
                e.target.src = ''
            }
        })
    }

    clearvirus(virusList);
    more.onclick = tapmore;
    GoMusic.onclick = playMusic;
    playMusic(false);

    // 淡出模块导出一下
    window.fadeOver = fadeOver
}()
