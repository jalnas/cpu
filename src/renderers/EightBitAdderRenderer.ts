import Renderer, { ViewportRect } from "~/interfaces/Renderer.interface"

import { EightBitAdder } from "~/logic/circuits/EightBitAdder"
import { FullAdderRenderer } from "./FullAdderRenderer"

export class EightBitAdderRenderer implements Renderer {
	x: number
	y: number
	width: number = 1600
	height: number = 220
	component: EightBitAdder

	renderers: Record<string, Renderer> = {}

	constructor(c: EightBitAdder, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = c

		this.renderers = {
			fa0: new FullAdderRenderer(c.components.f7, this.x, this.y),
			fa1: new FullAdderRenderer(c.components.f6, this.x + 200, this.y),
			fa2: new FullAdderRenderer(c.components.f5, this.x + 400, this.y),
			fa3: new FullAdderRenderer(c.components.f4, this.x + 600, this.y),
			fa4: new FullAdderRenderer(c.components.f3, this.x + 800, this.y),
			fa5: new FullAdderRenderer(c.components.f2, this.x + 1000, this.y),
			fa6: new FullAdderRenderer(c.components.f1, this.x + 1200, this.y),
			fa7: new FullAdderRenderer(c.components.f0, this.x + 1400, this.y),
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
