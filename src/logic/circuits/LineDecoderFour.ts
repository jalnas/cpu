import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateNOT } from "../LogicGates"
import { FourInputAND } from "./FourInputAND"

type LineDecoderFourInputs = {
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
}

type LineDecoderFourInternalComponents =
	| {
			not0: GateNOT
			not1: GateNOT
			not2: GateNOT
			not3: GateNOT
	  }
	| Record<string, FourInputAND>

// this could probably use some cool typescript magic
type LineDecoderFourOutputs = {
	o0: Emitter
	o1: Emitter
	o2: Emitter
	o3: Emitter
	o4: Emitter
	o5: Emitter
	o6: Emitter
	o7: Emitter
	o8: Emitter
	o9: Emitter
	o10: Emitter
	o11: Emitter
	o12: Emitter
	o13: Emitter
	o14: Emitter
	o15: Emitter
}

export class LineDecoderFour implements Component {
	components: LineDecoderFourInternalComponents
	inputs: LineDecoderFourInputs
	out: LineDecoderFourOutputs = null

	constructor(inputs: LineDecoderFourInputs) {
		this.inputs = inputs

		const not0 = new GateNOT(inputs.i0)
		const not1 = new GateNOT(inputs.i1)
		const not2 = new GateNOT(inputs.i2)
		const not3 = new GateNOT(inputs.i3)

		this.components = { not0, not1, not2, not3 }

		// generate 16 eight-input and gates
		for (let i = 0; i < 16; i++) {
			this.out = {
				...this.out,
				[`o${i}`]: new FourInputAND({
					i0: i & 0b1000 ? inputs.i0 : not0,
					i1: i & 0b0100 ? inputs.i1 : not1,
					i2: i & 0b0010 ? inputs.i2 : not2,
					i3: i & 0b0001 ? inputs.i3 : not3,
				}),
			}
		}
	}
}
