import Component from "~/interfaces/Component.interface"
import Renderer, { ViewportRect, RenderDirection } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

/**
 * @deprecated Old poorly implemented class, use NetRenderer instead
 */
export default class NetworkRenderer implements Renderer {
	x: number
	y: number
	width: number = 20
	height: number = 20
	component: never
	source: Emitter
	paths: number[][][]

	constructor(source: Emitter, x: number, y: number, paths: number[][][]) {
		this.source = source
		this.x = x
		this.y = y
		this.paths = paths
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		ctx.translate(vp.x, vp.y)
		ctx.strokeStyle = this.source?.value ? "red" : "black"

		ctx.beginPath()
		for (const path of this.paths) {
			let x = this.x,
				y = this.y
			ctx.moveTo(x, y)
			for (const pos of path) {
				x += pos[0]
				y += pos[1]
				ctx.lineTo(x, y)
			}
		}
		ctx.stroke()

		ctx.translate(-vp.x, -vp.y)
		ctx.restore()
	}
}
