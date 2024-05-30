import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import { FourInputAND } from "~/logic/circuits/FourInputAND"
import { ANDGateRenderer } from "./GateRenderers"
import NetworkRenderer from "./NetworkRenderer"

export class FourInputANDRenderer implements Renderer {
	x: number
	y: number
	width: number = 200
	height: number = 80
	component: FourInputAND

	renderers: Record<string, Renderer> = {}

	constructor(c: FourInputAND, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = c

		this.renderers = {
			neti0: new NetworkRenderer(c.inputs.i0, this.x, this.y + 10, [[[20, 0]]]),
			neto: new NetworkRenderer(c, this.x + 180, this.y + 60, [[[20, 0]]]),
		}

		for (let i = 0; i < 3; i++) {
			this.renderers[`andr${i}`] = new ANDGateRenderer(
				c.components[`and${i}`],
				this.x + 60 * i + 20,
				this.y + 20 * i,
				RenderDirection.RIGHT
			)
			this.renderers[`neti${i + 1}`] = new NetworkRenderer(c.inputs[`i${i + 1}`], this.x, this.y + 30 + 20 * i, [
				[[20 + i * 60, 0]],
			])
			if (i && i < 3) {
				this.renderers[`neta${i}`] = new NetworkRenderer(
					c.components[`and${i - 1}`],
					this.x + 60 * i + 0,
					this.y + 20 * i,
					[
						[
							[10, 0],
							[0, 10],
							[10, 0],
						],
					]
				)
			}
		}
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		// we first do object-specific rendering
		// ctx.translate(vp.x, vp.y)
		// ctx.strokeRect(this.x, this.y, this.width, this.height)
		// ctx.translate(-vp.x, -vp.y)
		// then call the sub-renderers
		for (const r of Object.values(this.renderers)) {
			if (r.inViewport(vp)) {
				r.render(ctx, vp)
			}
		}

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return vp.intersects(this.x, this.y, this.width, this.height)
	}
}
