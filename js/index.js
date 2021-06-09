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
    const isPlay = function isPlay(state){
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

    GoMusic.onclick = playMusic;
    playMusic(false)
}()
