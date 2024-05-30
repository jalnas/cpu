import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

import { ANDGateRenderer, NORGateRenderer, NOTGateRenderer } from "~/renderers/GateRenderers"
import { DFlipFlop } from "~/logic/FlipFlops"
import NetRenderer from "./NetRenderer"

export class DFlipFlopRenderer implements Renderer {
	x: number
	y: number
	width: number = 180
	height: number = 260
	dir: RenderDirection
	component: DFlipFlop

	renderers: Record<string, Renderer>

	constructor(d: DFlipFlop, x: number, y: number, dir: RenderDirection) {
		this.x = x
		this.y = y
		this.dir = dir
		this.component = d

		const notr0 = new NOTGateRenderer(null, this.x + 10, this.y + 40, RenderDirection.DOWN)
		const andr0 = new ANDGateRenderer(null, this.x + 20, this.y + 100, RenderDirection.DOWN)
		const norr2 = new NORGateRenderer(null, this.x + 30, this.y + 180, RenderDirection.DOWN)
		const norr3 = new NORGateRenderer(null, this.x + 110, this.y + 180, RenderDirection.DOWN)
		const andr1 = new ANDGateRenderer(null, this.x + 120, this.y + 100, RenderDirection.DOWN)

		const net0 = new NetRenderer(d.d, [
			[
				[this.x + 30, this.y],
				[0, 40],
			],
			[
				[this.x + 30, this.y + 20],
				[100, 0],
				[0, 80],
			],
		])
		const net2 = new NetRenderer(d.internal.not0, [
			[
				[this.x + 30, this.y + 80],
				[0, 20],
			],
		])
		const net3 = new NetRenderer(d.clk, [
			[
				[this.x + 150, this.y],
				[0, 100],
			],
			[
				[this.x + 150, this.y + 80],
				[-100, 0],
				[0, 20],
			],
		])
		const net5 = new NetRenderer(d.internal.and0, [
			[
				[this.x + 40, this.y + 140],
				[0, 40],
			],
		])
		const net6 = new NetRenderer(d.internal.and1, [
			[
				[this.x + 140, this.y + 140],
				[0, 40],
			],
		])

		const net7 = new NetRenderer(d.internal.nor0, [
			[
				[this.x + 50, this.y + 220],
				[0, 40],
			],
			[
				[this.x + 50, this.y + 240],
				[20, 0],
				[30, -80],
				[20, 0],
				[0, 20],
			],
		])
		const net8 = new NetRenderer(d.internal.nor1, [
			[
				[this.x + 130, this.y + 220],
				[0, 20],
				[-20, 0],
				[-30, -80],
				[-20, 0],
				[0, 20],
			],
		])

		this.renderers = {
			notr0,
			andr0,
			andr1,
			norr2,
			norr3,
			net0,
			net2,
			net3,
			net5,
			net6,
			net7,
			net8,
		}
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		//ctx.translate(vp.x, vp.y)
		// we first do object-specific rendering
		// ctx.strokeRect(this.x, this.y, this.width, this.height)
		// then call the sub-renderers
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
