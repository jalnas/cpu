import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { DFlipFlop } from "~/logic/FlipFlops"
import { GateAND } from "../LogicGates"
import { OutputEnabler } from "./OutputEnabler"
import { TriStateOutputEnabler } from "./TriStateOutputEnabler"

type MemoryCellComponents = {
	d0: DFlipFlop
	d1: DFlipFlop
	d2: DFlipFlop
	d3: DFlipFlop
	d4: DFlipFlop
	d5: DFlipFlop
	d6: DFlipFlop
	d7: DFlipFlop
	read: GateAND
	write: GateAND
	clk: GateAND
	select: GateAND
	ie: OutputEnabler
	oe: TriStateOutputEnabler
}

type MemoryCellInputs = {
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

// memorycell contains one byte of memory stored in 8 D-flipflops
// it also contains the write/read enable logic and the row/col selection logic
// all in all it contains 60 gates
export class MemoryCell implements Component {
	components: MemoryCellComponents
	inputs: MemoryCellInputs

	constructor(inputs: MemoryCellInputs) {
		this.inputs = inputs

		const select = new GateAND(inputs.col, inputs.row)
		const write = new GateAND(select, inputs.write)
		const read = new GateAND(select, inputs.read)
		const clk = new GateAND(write, inputs.clk)

		const ie = new OutputEnabler({
			enable: write,
			i0: inputs.m0,
			i1: inputs.m1,
			i2: inputs.m2,
			i3: inputs.m3,
			i4: inputs.m4,
			i5: inputs.m5,
			i6: inputs.m6,
			i7: inputs.m7,
		})

		const d0 = new DFlipFlop(ie.components.o0, clk)
		const d1 = new DFlipFlop(ie.components.o1, clk)
		const d2 = new DFlipFlop(ie.components.o2, clk)
		const d3 = new DFlipFlop(ie.components.o3, clk)
		const d4 = new DFlipFlop(ie.components.o4, clk)
		const d5 = new DFlipFlop(ie.components.o5, clk)
		const d6 = new DFlipFlop(ie.components.o6, clk)
		const d7 = new DFlipFlop(ie.components.o7, clk)

		const oe = new TriStateOutputEnabler({
			enable: read,
			i0: d0,
			i1: d1,
			i2: d2,
			i3: d3,
			i4: d4,
			i5: d5,
			i6: d6,
			i7: d7,
		})

		this.components = { select, write, read, clk, d0, d1, d2, d3, d4, d5, d6, d7, ie, oe }
	}
}
