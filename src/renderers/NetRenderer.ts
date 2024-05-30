import Component from "~/interfaces/Component.interface"
import Renderer, { ViewportRect, RenderDirection } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

export default class NetRenderer implements Renderer {
	x: number
	y: number
	width: number
	height: number
	component: never
	source: Emitter
	lines: number[][][]
	starts_on_junction: boolean

	constructor(source: Emitter, lines: number[][][], starts_on_junction?: boolean) {
		this.source = source
		this.starts_on_junction = starts_on_junction
		if (lines.length && lines[0].length && lines[0][0].length) {
			this.x = lines[0][0][0]
			this.y = lines[0][0][1]
			this.lines = lines
		} else {
			throw new TypeError("lines param needs to be a number[][][]")
		}
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		ctx.translate(vp.x, vp.y)
		ctx.strokeStyle = this.source?.value === null ? "#0ff" : this.source?.value ? "red" : "black"
		ctx.fillStyle = this.source?.value === null ? "#0ff" : this.source?.value ? "red" : "black"

		ctx.beginPath()

		for (let l = 0; l < this.lines.length; l++) {
			let [x, y] = this.lines[l][0]
			ctx.moveTo(x, y)
			if (l > 0 || this.starts_on_junction) {
				ctx.moveTo(x + 2, y)
				ctx.arc(x, y, 2, 0, Math.PI * 2)
				ctx.moveTo(x, y)
				//ctx.fill()
			}
			for (let i = 1; i < this.lines[l].length; i++) {
				let [_x, _y] = this.lines[l][i]
				x += _x
				y += _y
				ctx.lineTo(x, y)
			}
		}

		ctx.stroke()

		ctx.translate(-vp.x, -vp.y)
		ctx.restore()
	}
}
