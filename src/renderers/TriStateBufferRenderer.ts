import Component from "~/interfaces/Component.interface"
import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

export class TriStateBufferRenderer implements Renderer {
	x: number
	y: number
	dir: RenderDirection
	component: Component
	width: number = 40
	height: number = 40
	renderers?: Record<string, Renderer>

	constructor(gate: Component, x: number, y: number, dir: RenderDirection) {
		this.x = x
		this.y = y
		this.dir = dir
		this.component = gate
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)
		const stripe_count = 6

		ctx.beginPath()
		if (this.dir == RenderDirection.RIGHT) {
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x + 40, this.y + 20)
			ctx.lineTo(this.x, this.y + 40)
		}
		if (this.dir == RenderDirection.DOWN) {
			for (let i = 0; i < stripe_count; i++) {
				ctx.moveTo(this.x + i * (20 / stripe_count), this.y + i * (40 / stripe_count))
				ctx.lineTo(this.x + i * (40 / stripe_count), this.y)
			}
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x + 20, this.y + 40)
			ctx.lineTo(this.x + 40, this.y)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.moveTo(this.x + 40, this.y)
			ctx.lineTo(this.x, this.y + 20)
			ctx.lineTo(this.x + 40, this.y + 40)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.moveTo(this.x, this.y + 40)
			ctx.lineTo(this.x + 20, this.y)
			ctx.lineTo(this.x + 40, this.y + 40)
		}

		ctx.closePath()
		ctx.stroke()

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return vp.intersects(this.x, this.y, this.width, this.height)
	}
}
