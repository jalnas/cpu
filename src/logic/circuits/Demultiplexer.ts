import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"
import { LineDecoder } from "./LineDecoder"
import { GateAND } from "../LogicGates"

type DemultiplexerInputs = {
	in: Emitter
	s0: Emitter
	s1: Emitter
	s2: Emitter
	s3: Emitter
	s4: Emitter
	s5: Emitter
	s6: Emitter
	s7: Emitter
}

type DemultiplexerComponents =
	| {
			linedec: LineDecoder
	  }
	| Record<string, GateAND>

// Demultiplexer, or signal router, selects an output net and routes an input signal to it.
export class Demultiplexer implements Component {
	components: DemultiplexerComponents
	inputs: DemultiplexerInputs

	constructor(inputs: DemultiplexerInputs) {
		this.inputs = inputs

		const linedec = new LineDecoder({
			i0: inputs.s0,
			i1: inputs.s1,
			i2: inputs.s2,
			i3: inputs.s3,
			i4: inputs.s4,
			i5: inputs.s5,
			i6: inputs.s6,
			i7: inputs.s7,
		})

		this.components = { linedec }

		// generate 256 AND gates to output the incoming signal
		for (let i = 0; i < 256; i++) {
			this.components[`o${i}`] = new GateAND(linedec.components[`o${i}`], inputs.in)
		}
	}
}
