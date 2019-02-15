export default class SwipeDetect {

    private elem
    private direct: string = 'none'
    private startX: number = 0
    private startY: number = 0
    private offsetDist: number = 30
    private callback = (direct: string) => {}

    constructor(elem, callback?, offsetDist?) {
        this.elem = elem
        if (callback) {
            this.callback = callback
        }
        if (offsetDist) {
            this.offsetDist = offsetDist
        }
        this.init()
    }
    
    init = (): void => {
        this.elem.addEventListener('touchstart', this.onTouchStart, false)
        this.elem.addEventListener('touchmove', this.onTouchMove, false)
        this.elem.addEventListener('touchend', this.onTouchEnd, false)

        this.elem.addEventListener('mousedown', this.onMouseDown, false)
        this.elem.addEventListener('mousemove', this.onMouseMove, false)
        this.elem.addEventListener('mouseup', this.onMouseUp, false)
    }
    
    detstroy = (): void => {
        this.elem.removeEventListener('touchstart', this.onTouchStart, false)
        this.elem.removeEventListener('touchmove', this.onTouchMove, false)
        this.elem.removeEventListener('touchend', this.onTouchEnd, false)

        this.elem.removeEventListener('mousedown', this.onMouseDown, false)
        this.elem.removeEventListener('mousemove', this.onMouseMove, false)
        this.elem.removeEventListener('mouseup', this.onMouseUp, false)
    }

    private onTouchStart = (e): void => {
        let { pageX, pageY } = e.changedTouches[0]
        this.startAction(pageX, pageY)
        e.preventDefault()
    }
  
    private onTouchMove = (e): void => {
        e.preventDefault()
    }
  
    private onTouchEnd = (e): void => {
        let { pageX, pageY } = e.changedTouches[0]
        this.endAction(pageX, pageY)
        e.preventDefault()
    }

    private onMouseDown = (e): void => {
        let { pageX, pageY } = e
        this.startAction(pageX, pageY)
        e.preventDefault()
    }
  
    private onMouseMove = (e): void => {
        e.preventDefault()
    }
  
    private onMouseUp = (e): void => {
        let { pageX, pageY } = e
        this.endAction(pageX, pageY)
        e.preventDefault()
    }

    private startAction = (x, y): void => {
        this.direct = 'none'
        this.startX = x
        this.startY = y
    }

    private endAction = (x, y): void => {
        let distX = x - this.startX; let absDistX = Math.abs(distX)
        let distY = y - this.startY; let absDistY = Math.abs(distY)
        let isHorizon = (absDistX > this.offsetDist)
        let isVerical = (absDistY > this.offsetDist)
        if (isHorizon) {
            this.direct = (distX < 0) ? 'left' : 'right'
        } else if (isVerical) {
            this.direct = (distY < 0) ? 'up' : 'down'
        }
        this.callback(this.direct)
    }
}