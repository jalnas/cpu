import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateNOT } from "../LogicGates"
import { EightInputAND } from "./EightInputAND"

type LineDecoderInputs = {
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
	i4: Emitter
	i5: Emitter
	i6: Emitter
	i7: Emitter
}

type LineDecoderInternalComponents =
	| {
			not0: GateNOT
			not1: GateNOT
			not2: GateNOT
			not3: GateNOT
			not4: GateNOT
			not5: GateNOT
			not6: GateNOT
			not7: GateNOT
	  }
	| Record<string, EightInputAND>

export class LineDecoder implements Component {
	components: LineDecoderInternalComponents
	inputs: LineDecoderInputs

	out: EightInputAND[] = []

	constructor(inputs: LineDecoderInputs) {
		this.inputs = inputs

		const not0 = new GateNOT(inputs.i0)
		const not1 = new GateNOT(inputs.i1)
		const not2 = new GateNOT(inputs.i2)
		const not3 = new GateNOT(inputs.i3)
		const not4 = new GateNOT(inputs.i4)
		const not5 = new GateNOT(inputs.i5)
		const not6 = new GateNOT(inputs.i6)
		const not7 = new GateNOT(inputs.i7)

		this.components = { not0, not1, not2, not3, not4, not5, not6, not7 }

		// generate 256 eight-input and gates
		for (let i = 0; i < 256; i++) {
			this.out.push(
				new EightInputAND({
					i0: i & 0b10000000 ? inputs.i0 : not0,
					i1: i & 0b01000000 ? inputs.i1 : not1,
					i2: i & 0b00100000 ? inputs.i2 : not2,
					i3: i & 0b00010000 ? inputs.i3 : not3,
					i4: i & 0b00001000 ? inputs.i4 : not4,
					i5: i & 0b00000100 ? inputs.i5 : not5,
					i6: i & 0b00000010 ? inputs.i6 : not6,
					i7: i & 0b00000001 ? inputs.i7 : not7,
				})
			)
		}
	}
}
