import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import Component from "~/interfaces/Component.interface"

import HalfAdder from "~/logic/circuits/HalfAdder"

import { XORGateRenderer, ANDGateRenderer } from "~/renderers/GateRenderers"
import NetRenderer from "./NetRenderer"

export class HalfAdderRenderer implements Renderer {
	x: number
	y: number
	width: number = 100
	height: number = 100
	dir: RenderDirection
	component: Component

	renderers: {
		xorr0: XORGateRenderer
		andr0: ANDGateRenderer
		net0: NetRenderer
		net1: NetRenderer
		net2: NetRenderer
		net3: NetRenderer
	}

	constructor(h: HalfAdder, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = h

		const xorr0 = new XORGateRenderer(h.components.xor0, this.x + 40, this.y + 0, RenderDirection.RIGHT)
		const andr0 = new ANDGateRenderer(h.components.and0, this.x + 40, this.y + 60, RenderDirection.RIGHT)

		const net0 = new NetRenderer(h.inputs.s0, [
			[
				[this.x, this.y + 10],
				[40, 0],
			],
			[
				[this.x + 20, this.y + 10],
				[0, 60],
				[20, 0],
			],
		])
		const net1 = new NetRenderer(h.inputs.s0, [
			[
				[this.x, this.y + 30],
				[40, 0],
			],
			[
				[this.x + 10, this.y + 30],
				[0, 60],
				[30, 0],
			],
		])
		const net2 = new NetRenderer(h.carry, [
			[
				[this.x + 80, this.y + 20],
				[20, 0],
			],
		])
		const net3 = new NetRenderer(h.carry, [
			[
				[this.x + 80, this.y + 80],
				[10, 0],
				[0, 20],
			],
		])

		this.renderers = { xorr0, andr0, net0, net1, net2, net3 }
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		// we first do object-specific rendering
		ctx.translate(vp.x, vp.y)
		ctx.strokeRect(this.x, this.y, this.width, this.height)
		ctx.translate(-vp.x, -vp.y)
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
