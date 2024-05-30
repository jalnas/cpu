import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { DFlipFlop } from "~/logic/FlipFlops"

type RegisterInputs = {
	enable: Emitter
	clk: Emitter
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
	i4: Emitter
	i5: Emitter
	i6: Emitter
	i7: Emitter
}

type RegisterInternalComponents = {
	d0: DFlipFlop
	d1: DFlipFlop
	d2: DFlipFlop
	d3: DFlipFlop
	d4: DFlipFlop
	d5: DFlipFlop
	d6: DFlipFlop
	d7: DFlipFlop
}

// A register contains one byte of information stored in 8 D Flip-Flops
export class Register implements Component {
	components: RegisterInternalComponents
	inputs: RegisterInputs

	constructor(inputs: RegisterInputs) {
		this.inputs = inputs

		this.components = {
			d0: new DFlipFlop(inputs.i0, inputs.clk),
			d1: new DFlipFlop(inputs.i1, inputs.clk),
			d2: new DFlipFlop(inputs.i2, inputs.clk),
			d3: new DFlipFlop(inputs.i3, inputs.clk),
			d4: new DFlipFlop(inputs.i4, inputs.clk),
			d5: new DFlipFlop(inputs.i5, inputs.clk),
			d6: new DFlipFlop(inputs.i6, inputs.clk),
			d7: new DFlipFlop(inputs.i7, inputs.clk),
		}
	}
}
