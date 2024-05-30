import Circuit from "~/interfaces/Circuit.interface"
import Component from "~/interfaces/Component.interface"
import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import Emitter from "~/interfaces/Emitter.interface"

import InputController from "~/InputController"
import { ALU } from "~/logic/circuits/ALU"
import { ALURenderer } from "~/renderers/ALURenderer"
import Source from "~/logic/Source"
import SourceRenderer from "~/renderers/SourceRenderer"

type ALUCircuitInputs = {
	a0: Emitter
	a1: Emitter
	a2: Emitter
	a3: Emitter
	a4: Emitter
	a5: Emitter
	a6: Emitter
	a7: Emitter
	b0: Emitter
	b1: Emitter
	b2: Emitter
	b3: Emitter
	b4: Emitter
	b5: Emitter
	b6: Emitter
	b7: Emitter
	s0: Emitter
	s1: Emitter
	s2: Emitter
	s3: Emitter
	cin: Emitter
}

type ALUCircuitComponents = {
	alu: ALU
}

export class ALUCircuit implements Circuit {
	components: ALUCircuitComponents
	inputs: ALUCircuitInputs
	renderer: ALUCircuitRenderer

	controller: InputController

	// we should have a better way of routing keys to source toggling than this
	keymap = {
		q: "a7",
		w: "a6",
		e: "a5",
		r: "a4",
		t: "a3",
		y: "a2",
		u: "a1",
		i: "a0",
		a: "b7",
		s: "b6",
		d: "b5",
		f: "b4",
		g: "b3",
		h: "b2",
		j: "b1",
		k: "b0",
		z: "s0",
		x: "s1",
		c: "s2",
		v: "s3",
		b: "cin",
	}

	constructor() {
		this.inputs = {
			a0: new Source(false),
			a1: new Source(false),
			a2: new Source(false),
			a3: new Source(false),
			a4: new Source(false),
			a5: new Source(false),
			a6: new Source(false),
			a7: new Source(false),
			b0: new Source(false),
			b1: new Source(false),
			b2: new Source(false),
			b3: new Source(false),
			b4: new Source(false),
			b5: new Source(false),
			b6: new Source(false),
			b7: new Source(false),
			s0: new Source(false),
			s1: new Source(false),
			s2: new Source(false),
			s3: new Source(false),
			cin: new Source(false),
		}
		this.components = {
			alu: new ALU(
				{
					a0: this.inputs.a0,
					a1: this.inputs.a1,
					a2: this.inputs.a2,
					a3: this.inputs.a3,
					a4: this.inputs.a4,
					a5: this.inputs.a5,
					a6: this.inputs.a6,
					a7: this.inputs.a7,
					b0: this.inputs.b0,
					b1: this.inputs.b1,
					b2: this.inputs.b2,
					b3: this.inputs.b3,
					b4: this.inputs.b4,
					b5: this.inputs.b5,
					b6: this.inputs.b6,
					b7: this.inputs.b7,
				},
				{
					s0: this.inputs.s0,
					s1: this.inputs.s1,
					s2: this.inputs.s2,
					s3: this.inputs.s3,
					fc: this.inputs.cin,
				}
			),
		}

		this.renderer = new ALUCircuitRenderer(this, 0, 0)
	}

	// update internal state
	// the state needs to be advertised somehow
	updateInternalState(inputs: Record<string, boolean>): void {
		for (const [input, value] of Object.entries(inputs)) {
			this.inputs[input].setState(value)
		}
	}
}

class ALUCircuitRenderer implements Renderer {
	x: number
	y: number
	width: number = 120
	height: number = 80
	component: ALUCircuit
	renderers: Record<string, Renderer>

	constructor(circuit: ALUCircuit, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = circuit

		this.renderers = {
			s0r: new SourceRenderer(circuit.inputs.s0, 40, -20),
			s1r: new SourceRenderer(circuit.inputs.s1, 100, -20),
			s2r: new SourceRenderer(circuit.inputs.s2, 160, -20),
			s3r: new SourceRenderer(circuit.inputs.s3, 220, -20),
			cinr: new SourceRenderer(circuit.inputs.cin, 1700, 2090),
			a7r: new SourceRenderer(circuit.inputs.a7, -20, 1500),
			a6r: new SourceRenderer(circuit.inputs.a6, -20, 1520),
			a5r: new SourceRenderer(circuit.inputs.a5, -20, 1540),
			a4r: new SourceRenderer(circuit.inputs.a4, -20, 1560),
			a3r: new SourceRenderer(circuit.inputs.a3, -20, 1580),
			a2r: new SourceRenderer(circuit.inputs.a2, -20, 1600),
			a1r: new SourceRenderer(circuit.inputs.a1, -20, 1620),
			a0r: new SourceRenderer(circuit.inputs.a0, -20, 1640),
			b7r: new SourceRenderer(circuit.inputs.b7, -20, 1700),
			b6r: new SourceRenderer(circuit.inputs.b6, -20, 1720),
			b5r: new SourceRenderer(circuit.inputs.b5, -20, 1740),
			b4r: new SourceRenderer(circuit.inputs.b4, -20, 1760),
			b3r: new SourceRenderer(circuit.inputs.b3, -20, 1780),
			b2r: new SourceRenderer(circuit.inputs.b2, -20, 1800),
			b1r: new SourceRenderer(circuit.inputs.b1, -20, 1820),
			b0r: new SourceRenderer(circuit.inputs.b0, -20, 1840),
			alurenderer: new ALURenderer(circuit.components.alu, 0, 0),
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

		console.log(this.component.components.alu.components.bw_and_ts_gate.components.o0)

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}
}
