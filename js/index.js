~function () {
    // 点击播放按钮放歌
    let timer = null,
        Deg = 0;
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
                    font_content.innerHTML+= tempStr;
                    if(str.length===0){
                        clearInterval(timer);
                        timer = null;
                        fadeOver(referral,gameList)
                    }
                }, 100);
            }, 2000);
        })
    }

    GoMusic.onclick = playMusic;
    playMusic(false)
}()
