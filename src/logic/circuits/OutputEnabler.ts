import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { GateAND } from "../LogicGates"

type OutputEnablerInputs = {
	enable: Emitter
	i0: Emitter
	i1: Emitter
	i2: Emitter
	i3: Emitter
	i4: Emitter
	i5: Emitter
	i6: Emitter
	i7: Emitter
}

type OutputEnablerInternalComponents = {
	o0: GateAND
	o1: GateAND
	o2: GateAND
	o3: GateAND
	o4: GateAND
	o5: GateAND
	o6: GateAND
	o7: GateAND
}

export class OutputEnabler implements Component {
	components: OutputEnablerInternalComponents

	constructor(inputs: OutputEnablerInputs) {
		this.components = {
			o0: new GateAND(inputs.i0, inputs.enable),
			o1: new GateAND(inputs.i1, inputs.enable),
			o2: new GateAND(inputs.i2, inputs.enable),
			o3: new GateAND(inputs.i3, inputs.enable),
			o4: new GateAND(inputs.i4, inputs.enable),
			o5: new GateAND(inputs.i5, inputs.enable),
			o6: new GateAND(inputs.i6, inputs.enable),
			o7: new GateAND(inputs.i7, inputs.enable),
		}
	}
}
