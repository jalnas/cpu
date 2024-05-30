import Renderer, { ViewportRect, RenderDirection } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

export default class SourceRenderer implements Renderer {
	x: number
	y: number
	width: number = 20
	height: number = 20
	component: never
	source: Emitter

	constructor(source: Emitter, x: number, y: number) {
		this.source = source
		this.x = x
		this.y = y
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		ctx.translate(vp.x, vp.y)
		ctx.fillStyle = "lime"

		ctx.strokeRect(this.x, this.y, this.width, this.height)
		ctx.beginPath()
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 7.5, 0, Math.PI * 2)
		if (this.source.value) {
			ctx.fill()
		}
		ctx.stroke()

		ctx.restore()
	}
}
