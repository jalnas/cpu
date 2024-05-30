import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

import Component from "~/interfaces/Component.interface"
import { TriStateOutputEnabler } from "~/logic/circuits/TriStateOutputEnabler"
import { TriStateBufferRenderer } from "./TriStateBufferRenderer"
import NetRenderer from "./NetRenderer"

export class TriStateOutputEnablerRenderer implements Component {
	x: number
	y: number
	width: number = 470
	height: number = 250
	component: TriStateOutputEnabler
	renderers: Record<string, Renderer> = {}

	constructor(c: TriStateOutputEnabler, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = c
		this.renderers = {}

		const net_segments = []

		for (let i = 0; i < 8; i++) {
			this.renderers[`tso${i}`] = new TriStateBufferRenderer(
				c.components[`o${i}`],
				this.x + 10 + 60 * i,
				this.y + 30 * i,
				RenderDirection.DOWN
			)
			if (i < 7) {
				this.renderers[`tsonet${i}`] = new NetRenderer(c.components[`o${i}`], [
					[
						[this.x + 30 + 60 * i, this.y + 40 + 30 * i],
						[0, 210 - 30 * i],
					],
				])
				net_segments.push([
					[this.x, this.y + 20 + 30 * i],
					[20 + 60 * i, 0],
				])
			} else {
			}
		}

		this.renderers.enablenet = new NetRenderer(c.inputs.enable, [
			[
				[this.x, this.y],
				[0, 8 * 30 - 10],
				[440, 0],
			],
			...net_segments,
		])
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
