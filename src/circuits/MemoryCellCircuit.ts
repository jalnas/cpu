import Circuit from "~/interfaces/Circuit.interface"
import Component from "~/interfaces/Component.interface"
import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

import Source from "~/logic/Source"

import { DFlipFlop } from "~/logic/FlipFlops"
import { MemoryCell } from "~/logic/circuits/MemoryCell"
import { MemoryCellRenderer } from "~/renderers/MemoryCellRenderer"
import SourceRenderer from "~/renderers/SourceRenderer"
import { EightInputANDRenderer } from "~/renderers/EightInputANDRenderer"
import { EightInputAND } from "~/logic/circuits/EightInputAND"
import { LineDecoderRenderer } from "~/renderers/LineDecoderRenderer"
import { LineDecoder } from "~/logic/circuits/LineDecoder"
import InputController from "~/InputController"
import FullAdder from "~/logic/circuits/FullAdder"
import { FullAdderRenderer } from "~/renderers/FullAdderRenderer"
import { HalfAdderRenderer } from "~/renderers/HalfAdderRenderer"
import HalfAdder from "~/logic/circuits/HalfAdder"

export class MemoryCellCircuit implements Circuit {
	components: {
		m0: MemoryCell
	}
	inputs: {
		write: Emitter
		read: Emitter
		clk: Emitter
		col: Emitter
		row: Emitter
		m0: Emitter
		m1: Emitter
		m2: Emitter
		m3: Emitter
		m4: Emitter
		m5: Emitter
		m6: Emitter
		m7: Emitter
	}
	renderer: Renderer

	//controller: InputController

	keymap = {
		q: "m0",
		w: "m1",
		e: "m2",
		r: "m3",
		t: "m4",
		y: "m5",
		u: "m6",
		i: "m7",
		a: "write",
		s: "read",
		p: "clk",
		g: "col",
		h: "row",
	}

	constructor() {
		this.inputs = {
			write: new Source(false),
			read: new Source(false),
			clk: new Source(false),
			col: new Source(false),
			row: new Source(false),
			m0: new Source(false),
			m1: new Source(false),
			m2: new Source(false),
			m3: new Source(false),
			m4: new Source(false),
			m5: new Source(false),
			m6: new Source(false),
			m7: new Source(false),
		}

		this.components = { m0: new MemoryCell(this.inputs) }

		this.renderer = new MemoryCellCircuitRenderer(this, 0, 0, RenderDirection.UP)
	}

	// update internal state
	// the state needs to be advertised somehow
	updateInternalState(inputs: Record<string, boolean>): void {
		for (const [input, value] of Object.entries(inputs)) {
			this.inputs[input].setState(value)
		}
	}
}

class MemoryCellCircuitRenderer implements Renderer {
	x: number
	y: number
	width: number = 110
	height: number = 80
	dir: RenderDirection
	component: Component

	renderers: Record<string, Renderer>

	constructor(r: MemoryCellCircuit, x: number, y: number, dir: RenderDirection) {
		this.x = x
		this.y = y
		this.dir = dir
		this.component = r

		this.renderers = {
			write: new SourceRenderer(r.inputs.write, 10, 10),
			read: new SourceRenderer(r.inputs.read, 40, 10),
			clk: new SourceRenderer(r.inputs.clk, 70, 10),
			col: new SourceRenderer(r.inputs.col, 100, 10),
			row: new SourceRenderer(r.inputs.row, 130, 10),
			m0: new SourceRenderer(r.inputs.m0, 160, 10),
			m1: new SourceRenderer(r.inputs.m1, 190, 10),
			m2: new SourceRenderer(r.inputs.m2, 220, 10),
			m3: new SourceRenderer(r.inputs.m3, 250, 10),
			m4: new SourceRenderer(r.inputs.m4, 280, 10),
			m5: new SourceRenderer(r.inputs.m5, 310, 10),
			m6: new SourceRenderer(r.inputs.m6, 340, 10),
			m7: new SourceRenderer(r.inputs.m7, 370, 10),
			mr0: new MemoryCellRenderer(r.components.m0, 0, 100),
			ldr: new LineDecoderRenderer(
				new LineDecoder({
					i0: r.components.m0.components.d0,
					i1: r.components.m0.components.d1,
					i2: r.components.m0.components.d2,
					i3: r.components.m0.components.d3,
					i4: r.components.m0.components.d4,
					i5: r.components.m0.components.d5,
					i6: r.components.m0.components.d6,
					i7: r.components.m0.components.d7,
				}),
				230,
				540
			),
			fa0: new FullAdderRenderer(
				new FullAdder(
					r.components.m0.components.d0,
					r.components.m0.components.d1,
					r.components.m0.components.d2
				),
				0,
				540
			),
			fa1: new FullAdderRenderer(
				new FullAdder(
					r.components.m0.components.d0,
					r.components.m0.components.d1,
					r.components.m0.components.d2
				),
				0,
				700
			),
			fa2: new FullAdderRenderer(
				new FullAdder(
					r.components.m0.components.d0,
					r.components.m0.components.d1,
					r.components.m0.components.d2
				),
				0,
				860
			),
			ha0: new HalfAdderRenderer(
				new HalfAdder(r.components.m0.components.d0, r.components.m0.components.d1),
				0,
				440
			),
		}
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		// we first do object-specific rendering
		//ctx.strokeRect(this.x, this.y, this.width, this.height)
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
