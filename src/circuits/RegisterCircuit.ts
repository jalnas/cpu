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
import SourceRenderer from "~/renderers/SourceRenderer"
import SignalRenderer from "~/renderers/SignalRenderer"
import NetworkRenderer from "~/renderers/NetworkRenderer"
import { DFlipFlop } from "~/logic/FlipFlops"
import { DFlipFlopRenderer } from "~/renderers/DFlipFlopRenderer"

export class RegisterCircuit implements Circuit {
	components: {
		d0: DFlipFlop
		d1: DFlipFlop
		d2: DFlipFlop
		d3: DFlipFlop
	}
	inputs: {
		s0: Emitter
		s1: Emitter
		s2: Emitter
		s3: Emitter
		clk0: Emitter
	}
	renderer: Renderer

	keymap = {
		q: "s0",
		w: "s1",
		e: "s2",
		r: "s3",
		c: "clk0",
	}

	constructor() {
		const s0 = new Source(false)
		const s1 = new Source(false)
		const s2 = new Source(false)
		const s3 = new Source(false)
		const clk0 = new Source(false)

		const d0 = new DFlipFlop(s0, clk0)
		const d1 = new DFlipFlop(s1, clk0)
		const d2 = new DFlipFlop(s2, clk0)
		const d3 = new DFlipFlop(s3, clk0)

		this.inputs = { s0, s1, s2, s3, clk0 }
		this.components = { d0, d1, d2, d3 }

		this.renderer = new RegisterCircuitRenderer(this, 0, 0, RenderDirection.UP)
	}

	// update internal state
	// the state needs to be advertised somehow
	updateInternalState(inputs: Record<string, boolean>): void {
		for (const [input, value] of Object.entries(inputs)) {
			this.inputs[input].setState(value)
		}
	}
}

class RegisterCircuitRenderer implements Renderer {
	x: number
	y: number
	width: number = 110
	height: number = 80
	dir: RenderDirection
	component: Component

	renderers: Record<string, Renderer>

	constructor(r: RegisterCircuit, x: number, y: number, dir: RenderDirection) {
		this.x = x
		this.y = y
		this.dir = dir
		this.component = r

		// define components
		const s0r = new SourceRenderer(r.inputs.s0, 20, 40)
		const s1r = new SourceRenderer(r.inputs.s1, 220, 40)
		const s2r = new SourceRenderer(r.inputs.s2, 420, 40)
		const s3r = new SourceRenderer(r.inputs.s3, 620, 40)
		const clk0r = new SourceRenderer(r.inputs.clk0, 20, 0)

		const d0r = new DFlipFlopRenderer(r.components.d0, this.x + 0, this.y + 60, RenderDirection.DOWN)
		const d1r = new DFlipFlopRenderer(r.components.d1, this.x + 200, this.y + 60, RenderDirection.DOWN)
		const d2r = new DFlipFlopRenderer(r.components.d2, this.x + 400, this.y + 60, RenderDirection.DOWN)
		const d3r = new DFlipFlopRenderer(r.components.d3, this.x + 600, this.y + 60, RenderDirection.DOWN)

		const o1r = new SignalRenderer(r.components.d0, this.x + 40, this.y + 320, RenderDirection.DOWN)
		const o2r = new SignalRenderer(r.components.d1, this.x + 240, this.y + 320, RenderDirection.DOWN)
		const o3r = new SignalRenderer(r.components.d2, this.x + 440, this.y + 320, RenderDirection.DOWN)
		const o4r = new SignalRenderer(r.components.d3, this.x + 640, this.y + 320, RenderDirection.DOWN)

		const net0 = new NetworkRenderer(r.inputs.clk0, this.x + 40, this.y + 10, [
			[
				[110, 0],
				[0, 50],
			],
		])
		const net1 = new NetworkRenderer(r.inputs.clk0, this.x + 150, this.y + 10, [
			[
				[200, 0],
				[0, 50],
			],
		])
		const net2 = new NetworkRenderer(r.inputs.clk0, this.x + 350, this.y + 10, [
			[
				[200, 0],
				[0, 50],
			],
		])
		const net3 = new NetworkRenderer(r.inputs.clk0, this.x + 550, this.y + 10, [
			[
				[200, 0],
				[0, 50],
			],
		])

		this.renderers = { s0r, s1r, s2r, s3r, clk0r, d0r, d1r, d2r, d3r, net0, net1, net2, net3, o1r, o2r, o3r, o4r }
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		// we first do object-specific rendering
		//ctx.strokeRect(this.x, this.y, this.width, this.height)
		// then call the sub-renderers
		for (const r of Object.values(this.renderers)) {
			if (r.inViewport(vp)) {
				r.render(ctx, vp)
			}
		}
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}
}
