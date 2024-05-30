import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { TriStateBuffer } from "../TriStateBuffer"

type TriStateOutputEnablerInputs = {
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

type TriStateOutputEnablerComponents = {
	o0: TriStateBuffer
	o1: TriStateBuffer
	o2: TriStateBuffer
	o3: TriStateBuffer
	o4: TriStateBuffer
	o5: TriStateBuffer
	o6: TriStateBuffer
	o7: TriStateBuffer
}

export class TriStateOutputEnabler implements Component {
	inputs: TriStateOutputEnablerInputs
	components: TriStateOutputEnablerComponents

	constructor(inputs: TriStateOutputEnablerInputs) {
		this.inputs = inputs
		this.components = {
			o0: new TriStateBuffer(inputs.i0, inputs.enable),
			o1: new TriStateBuffer(inputs.i1, inputs.enable),
			o2: new TriStateBuffer(inputs.i2, inputs.enable),
			o3: new TriStateBuffer(inputs.i3, inputs.enable),
			o4: new TriStateBuffer(inputs.i4, inputs.enable),
			o5: new TriStateBuffer(inputs.i5, inputs.enable),
			o6: new TriStateBuffer(inputs.i6, inputs.enable),
			o7: new TriStateBuffer(inputs.i7, inputs.enable),
		}
	}

	get busInputs() {
		return {
			i0: this.components.o0,
			i1: this.components.o1,
			i2: this.components.o2,
			i3: this.components.o3,
			i4: this.components.o4,
			i5: this.components.o5,
			i6: this.components.o6,
			i7: this.components.o7,
		}
	}
}
