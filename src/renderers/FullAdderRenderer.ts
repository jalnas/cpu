import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

import FullAdder from "~/logic/circuits/FullAdder"
import { XORGateRenderer, ANDGateRenderer, ORGateRenderer } from "./GateRenderers"
import NetRenderer from "./NetRenderer"

export class FullAdderRenderer implements Renderer {
	x: number
	y: number
	width: number = 200
	height: number = 180
	dir: RenderDirection
	component: FullAdder

	renderers: {
		xor0: XORGateRenderer
		xor1: XORGateRenderer
		and0: ANDGateRenderer
		and1: ANDGateRenderer
		or0: ORGateRenderer
		net0: NetRenderer
		net1: NetRenderer
		net2: NetRenderer
		net3: NetRenderer
		net4: NetRenderer
		net5: NetRenderer
		net6: NetRenderer
		net7: NetRenderer
	}

	constructor(f: FullAdder, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = f

		const xor0 = new XORGateRenderer(f.components.xor0, x + 160, y + 40, RenderDirection.DOWN)
		const xor1 = new XORGateRenderer(f.components.xor1, x + 150, y + 140, RenderDirection.DOWN)
		const and0 = new ANDGateRenderer(f.components.and0, x + 100, y, RenderDirection.LEFT)
		const and1 = new ANDGateRenderer(f.components.and1, x + 100, y + 90, RenderDirection.LEFT)
		const or0 = new ORGateRenderer(f.components.or0, x + 40, y + 80, RenderDirection.LEFT)

		const net0 = new NetRenderer(f.inputs.s0, [
			[
				[x + 190, y],
				[0, 40],
			],
			[
				[x + 190, y + 10],
				[-50, 0],
			],
		])

		const net1 = new NetRenderer(f.inputs.s1, [
			[
				[x + 170, y],
				[0, 40],
			],
			[
				[x + 170, y + 30],
				[-30, 0],
			],
		])

		const net2 = new NetRenderer(f.inputs.c0, [
			[
				[x + 200, y + 100],
				[-60, 0],
			],
			[
				[x + 160, y + 100],
				[0, 40],
			],
		])

		const net3 = new NetRenderer(f.components.xor0, [
			[
				[x + 180, y + 80],
				[0, 60],
			],
			[
				[x + 180, y + 120],
				[-40, 0],
			],
		])

		const net4 = new NetRenderer(f.components.and1, [
			[
				[x + 100, y + 110],
				[-20, 0],
			],
		])

		const net5 = new NetRenderer(f.components.and0, [
			[
				[x + 100, y + 20],
				[-10, 0],
				[0, 70],
				[-10, 0],
			],
		])

		const net6 = new NetRenderer(f.components.or0, [
			[
				[x + 40, y + 100],
				[-40, 0],
			],
		])

		const net7 = new NetRenderer(f.components.xor1, [
			[
				[x + 170, y + 180],
				[0, 40],
			],
		])

		this.renderers = { xor0, xor1, and0, and1, or0, net0, net1, net2, net3, net4, net5, net6, net7 }
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
