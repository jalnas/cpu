import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import Component from "~/interfaces/Component.interface"

import { ANDGateRenderer, ORGateRenderer, XORGateRenderer } from "./GateRenderers"
import { ALUBitwiseAND, ALUBitwiseOR, ALUBitwiseXOR } from "~/logic/circuits/ALUBitwiseComponents"

abstract class ALUBitwiseRenderer {
	x: number
	y: number
	width: number = 460
	height: number = 40
	abstract component: Component

	renderers: Record<string, Renderer> = {}

	constructor(c: ALUBitwiseAND, x: number, y: number) {
		this.x = x
		this.y = y

		this.renderers = {}
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

export class ALUBitwiseANDRenderer extends ALUBitwiseRenderer implements Renderer {
	component: ALUBitwiseAND

	constructor(c: ALUBitwiseAND, x: number, y: number) {
		super(c, x, y)

		for (let i = 0; i < 8; i++) {
			this.renderers[`o${i}`] = new ANDGateRenderer(
				c.components[`o${i}`],
				this.x + i * 60,
				this.y,
				RenderDirection.DOWN
			)
		}
	}
}

export class ALUBitwiseORRenderer extends ALUBitwiseRenderer implements Renderer {
	component: ALUBitwiseOR

	constructor(c: ALUBitwiseOR, x: number, y: number) {
		super(c, x, y)

		for (let i = 0; i < 8; i++) {
			this.renderers[`o${i}`] = new ORGateRenderer(
				c.components[`o${i}`],
				this.x + i * 60,
				this.y,
				RenderDirection.DOWN
			)
		}
	}
}

export class ALUBitwiseXORRenderer extends ALUBitwiseRenderer implements Renderer {
	component: ALUBitwiseXOR

	constructor(c: ALUBitwiseXOR, x: number, y: number) {
		super(c, x, y)

		for (let i = 0; i < 8; i++) {
			this.renderers[`o${i}`] = new XORGateRenderer(
				c.components[`o${i}`],
				this.x + i * 60,
				this.y,
				RenderDirection.DOWN
			)
		}
	}
}
