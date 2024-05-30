import Component from "~/interfaces/Component.interface"
import Renderer, { ViewportRect, RenderDirection } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

export default class SignalRenderer implements Renderer {
	x: number
	y: number
	width: number = 20
	height: number = 20
	dir: RenderDirection
	component: never
	source: Emitter

	constructor(source: Emitter, x: number, y: number, dir: RenderDirection) {
		this.source = source
		this.x = x
		this.y = y
		this.dir = dir
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		ctx.translate(vp.x, vp.y)

		ctx.fillStyle = "red"

		ctx.strokeRect(this.x, this.y, this.width, this.height)
		ctx.beginPath()
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 7.5, 0, Math.PI * 2)
		if (this.source._value) {
			ctx.fill()
		}
		ctx.stroke()

		ctx.restore()
	}
}
