class AniScroll {
    constructor() {
        this.currentPosition = 0;
        this.elementControlList = [];
        this.style = '';
        this.interval = 500;
    }

    init(interval) {
        let that = this;
        document.addEventListener('wheel', function (event) {
            that.act(event.deltaY*0.3)
        }, false);
        let style = document.createElement('style');
        this.style = style;
        document.head.appendChild(style);
        setInterval(() => { this.setElementAni(this) }, interval);
        this.interval = interval;
    }

    addElementController(element, startValue, speed, existCallback) {
        this.elementControlList.push({
            elementId: element,
            currentPosition: 0,
            previousPosition: 0,
            startValue: startValue,
            speed: speed,
            existCallback: existCallback,
            callbackDone: false
        });
    }

    act(deltaY) {
        //改变当前的移动位置标准参照状态
        this.currentPosition = this.currentPosition + deltaY;
        if (this.currentPosition < 0) this.currentPosition = 0;
        //遍历elementController,为每个元素设置动画
        for (let e of this.elementControlList) {
            //元素开始进入视图
            if (e.startValue <= this.currentPosition) {
                e.currentPosition = Math.round(this.currentPosition * e.speed - e.startValue);
                if (!e.callbackDone) {
                    e.existCallback();
                    e.callbackDone = true;
                }
            } else {//元素不在视图内
                e.currentPosition = 0;
                e.callbackDone = false;
            }
        }
    }

    setElementAni(thisObj) {
        //遍历所有的元素，计算在这个时间片内的位置改变
        let styleStr = '\n';
        // let that = thisObj;
        for (let e of this.elementControlList) {
            // let pri = e.previousPosition;
            let curr = e.currentPosition;
            //动态创建一个动画 ease-in-out infinite alternate
            styleStr = styleStr + `
            #${e.elementId}{
            animation:${e.elementId + 'Ani'}${e.previousPosition}${e.currentPosition} ${this.interval}ms ease-in-out forwards;
            -webkit-animation:${e.elementId + 'Ani'}${e.previousPosition}${e.currentPosition} ${this.interval}ms ease-in-out forwards; /* Safari and Chrome */
            }
            
  @keyframes ${e.elementId + 'Ani'}${e.previousPosition}${e.currentPosition} {
  from {
    transform: translate(-${e.previousPosition}px, 0);
  }

  to {
    transform: translate(-${e.currentPosition}px, 0);
  }
}
`;
            e.previousPosition = curr;
        }
        this.style.innerHTML = styleStr;
    }
}

module.exports = AniScroll;