import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import { EightInputAND } from "~/logic/circuits/EightInputAND"
import { ANDGateRenderer } from "./GateRenderers"
import NetworkRenderer from "./NetworkRenderer"

export class EightInputANDRenderer implements Renderer {
	x: number
	y: number
	width: number = 440
	height: number = 160
	component: EightInputAND

	renderers: Record<string, Renderer> = {}

	constructor(c: EightInputAND, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = c

		this.renderers = {
			neti0: new NetworkRenderer(c.inputs.i0, this.x, this.y + 10, [[[20, 0]]]),
			neto: new NetworkRenderer(c, this.x + 420, this.y + 140, [[[20, 0]]]),
		}

		for (let i = 0; i < 7; i++) {
			this.renderers[`andr${i}`] = new ANDGateRenderer(
				c.components[`and${i}`],
				this.x + 60 * i + 20,
				this.y + 20 * i,
				RenderDirection.RIGHT
			)
			this.renderers[`neti${i + 1}`] = new NetworkRenderer(c.inputs[`i${i + 1}`], this.x, this.y + 30 + 20 * i, [
				[[20 + i * 60, 0]],
			])
			if (i && i < 7) {
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
		if (vp.z < 0.3) {
			ctx.lineWidth = 3
			ctx.font = "40pt sans-serif"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.translate(vp.x, vp.y)
			ctx.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10)
			ctx.fillText("8 Input AND", this.x + this.width / 2, this.y + this.height / 2)
			ctx.translate(-vp.x, -vp.y)
		} else {
			// ctx.translate(vp.x, vp.y)
			// //ctx.strokeRect(this.x, this.y, this.width, this.height)
			// ctx.translate(-vp.x, -vp.y)
			// then call the sub-renderers
			for (const r of Object.values(this.renderers)) {
				if (r.inViewport(vp)) {
					r.render(ctx, vp)
				}
			}
		}

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return vp.intersects(this.x, this.y, this.width, this.height)
	}
}
