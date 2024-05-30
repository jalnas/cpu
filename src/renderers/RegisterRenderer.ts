import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

import { Register } from "~/logic/circuits/Register"

import { ANDGateRenderer } from "~/renderers/GateRenderers"
import NetworkRenderer from "./NetworkRenderer"
import { DFlipFlopRenderer } from "./DFlipFlopRenderer"

export class RegisterRenderer implements Renderer {
	x: number
	y: number
	width: number = 1600
	height: number = 500
	component: Register

	renderers: Record<string, Renderer>

	constructor(r: Register, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = r

		let renderers: Record<string, Renderer> = {}

		for (let i = 0; i < 8; i++) {
			renderers[`i${i}`] = new ANDGateRenderer(
				r.components[`i${i}`],
				this.x + 240 + i * 160,
				this.y + 100,
				RenderDirection.DOWN
			)
			renderers[`d${i}`] = new DFlipFlopRenderer(
				r.components[`d${i}`],
				this.x + 230 + i * 160,
				this.y + 140,
				RenderDirection.DOWN
			)
		}

		// add input nets
		renderers.net0 = new NetworkRenderer(r.inputs.clk, this.x, this.y + 30, [[[200, 0]]])

		this.renderers = renderers
	}

	// render self
	_render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.translate(vp.x, vp.y)
		ctx.translate(-vp.x, -vp.y)
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()

		this._render(ctx, vp)

		for (const r of Object.values(this.renderers)) {
			if (r.inViewport(vp)) {
				r.render(ctx, vp)
			}
		}

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}
}
