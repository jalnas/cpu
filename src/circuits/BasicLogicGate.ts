import Circuit from "~/interfaces/Circuit.interface"
import Component from "~/interfaces/Component.interface"
import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateAND, GateXOR } from "~/logic/LogicGates"
import Source from "~/logic/Source"

import {
	XORGateRenderer,
	ANDGateRenderer,
	NANDGateRenderer,
	NOTGateRenderer,
	NORGateRenderer,
	ORGateRenderer,
	XNORGateRenderer,
} from "../renderers/GateRenderers"

// a circuit is a fully contained assembly of logic, renderers, and interaction
// The basic logic gate circuit contains a single XOR gate and two inputs
export class BasicLogicGate implements Circuit {
	components: {
		xor0: GateXOR
		and0: GateAND
	}
	inputs: {
		s0: Emitter
		s1: Emitter
	}
	renderer: Renderer

	keymap = {
		a: "s0",
		s: "s1",
	}

	constructor() {
		const s0 = new Source(true)
		const s1 = new Source(false)
		const xor0 = new GateXOR(s0, s1)
		const and0 = new GateAND(s0, s1)

		this.inputs = { s0, s1 }
		this.components = { xor0, and0 }

		this.renderer = new BasicLogicGateRenderer(this, 0, 0, RenderDirection.UP)
	}

	// update internal state
	// the state needs to be advertised somehow
	updateInternalState(inputs: Record<string, boolean>): void {
		for (const [input, value] of Object.entries(inputs)) {
			this.inputs[input].setState(value)
		}
	}
}

class BasicLogicGateRenderer implements Renderer {
	x: number
	y: number
	width: number = 110
	height: number = 80
	dir: RenderDirection
	component: Component

	renderers: Record<string, Renderer>

	constructor(b: BasicLogicGate, x: number, y: number, dir: RenderDirection) {
		this.x = x
		this.y = y
		this.dir = dir
		this.component = b

		let renderdir = RenderDirection.UP

		const notr0 = new NOTGateRenderer(b.components.and0, this.x + 20, this.y + 30, renderdir)
		const orr0 = new ORGateRenderer(b.components.and0, this.x + 80, this.y + 30, renderdir)
		const xorr0 = new XORGateRenderer(b.components.and0, this.x + 140, this.y + 30, renderdir)
		const andr0 = new ANDGateRenderer(b.components.and0, this.x + 200, this.y + 30, renderdir)
		const norr0 = new NORGateRenderer(b.components.and0, this.x + 260, this.y + 30, renderdir)
		const xnorr0 = new XNORGateRenderer(b.components.and0, this.x + 320, this.y + 30, renderdir)
		const nandr0 = new NANDGateRenderer(b.components.and0, this.x + 380, this.y + 30, renderdir)

		renderdir = RenderDirection.RIGHT

		const notr1 = new NOTGateRenderer(b.components.and0, this.x + 20, this.y + 90, renderdir)
		const orr1 = new ORGateRenderer(b.components.and0, this.x + 80, this.y + 90, renderdir)
		const xorr1 = new XORGateRenderer(b.components.and0, this.x + 140, this.y + 90, renderdir)
		const andr1 = new ANDGateRenderer(b.components.and0, this.x + 200, this.y + 90, renderdir)
		const norr1 = new NORGateRenderer(b.components.and0, this.x + 260, this.y + 90, renderdir)
		const xnorr1 = new XNORGateRenderer(b.components.and0, this.x + 320, this.y + 90, renderdir)
		const nandr1 = new NANDGateRenderer(b.components.and0, this.x + 380, this.y + 90, renderdir)

		renderdir = RenderDirection.DOWN

		const notr2 = new NOTGateRenderer(b.components.and0, this.x + 20, this.y + 150, renderdir)
		const orr2 = new ORGateRenderer(b.components.and0, this.x + 80, this.y + 150, renderdir)
		const xorr2 = new XORGateRenderer(b.components.and0, this.x + 140, this.y + 150, renderdir)
		const andr2 = new ANDGateRenderer(b.components.and0, this.x + 200, this.y + 150, renderdir)
		const norr2 = new NORGateRenderer(b.components.and0, this.x + 260, this.y + 150, renderdir)
		const xnorr2 = new XNORGateRenderer(b.components.and0, this.x + 320, this.y + 150, renderdir)
		const nandr2 = new NANDGateRenderer(b.components.and0, this.x + 380, this.y + 150, renderdir)

		renderdir = RenderDirection.LEFT

		const notr3 = new NOTGateRenderer(b.components.and0, this.x + 20, this.y + 210, renderdir)
		const orr3 = new ORGateRenderer(b.components.and0, this.x + 80, this.y + 210, renderdir)
		const xorr3 = new XORGateRenderer(b.components.and0, this.x + 140, this.y + 210, renderdir)
		const andr3 = new ANDGateRenderer(b.components.and0, this.x + 200, this.y + 210, renderdir)
		const norr3 = new NORGateRenderer(b.components.and0, this.x + 260, this.y + 210, renderdir)
		const xnorr3 = new XNORGateRenderer(b.components.and0, this.x + 320, this.y + 210, renderdir)
		const nandr3 = new NANDGateRenderer(b.components.and0, this.x + 380, this.y + 210, renderdir)

		this.renderers = {
			notr0,
			orr0,
			xorr0,
			andr0,
			norr0,
			xnorr0,
			nandr0,
			notr1,
			orr1,
			xorr1,
			andr1,
			norr1,
			xnorr1,
			nandr1,
			notr2,
			orr2,
			xorr2,
			andr2,
			norr2,
			xnorr2,
			nandr2,
			notr3,
			orr3,
			xorr3,
			andr3,
			norr3,
			xnorr3,
			nandr3,
		}
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		// ctx.save()
		// ctx.translate(vp.x, vp.y)
		// we first do object-specific rendering
		//ctx.strokeRect(this.x, this.y, this.width, this.height)
		// then call the sub-renderers
		for (const r of Object.values(this.renderers)) {
			if (r.inViewport(vp)) {
				r.render(ctx, vp)
			}
		}

		// ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}
}
