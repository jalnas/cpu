import Component from "~/interfaces/Component.interface"

import { Bus } from "~/logic/Bus"
import { TriStateBuffer } from "../TriStateBuffer"

type EightBitBusComponents = {
	d0: Bus
	d1: Bus
	d2: Bus
	d3: Bus
	d4: Bus
	d5: Bus
	d6: Bus
	d7: Bus
}

type EightBitBusInputs = {
	i0: TriStateBuffer
	i1: TriStateBuffer
	i2: TriStateBuffer
	i3: TriStateBuffer
	i4: TriStateBuffer
	i5: TriStateBuffer
	i6: TriStateBuffer
	i7: TriStateBuffer
}

export class EightBitBus implements Component {
	components: EightBitBusComponents

	// buses are initialized with no inputs
	constructor() {
		this.components = {
			d0: new Bus(),
			d1: new Bus(),
			d2: new Bus(),
			d3: new Bus(),
			d4: new Bus(),
			d5: new Bus(),
			d6: new Bus(),
			d7: new Bus(),
		}
	}

	connectInputs(inputs: EightBitBusInputs) {
		this.components.d0.addInput(inputs.i0)
		this.components.d1.addInput(inputs.i1)
		this.components.d2.addInput(inputs.i2)
		this.components.d3.addInput(inputs.i3)
		this.components.d4.addInput(inputs.i4)
		this.components.d5.addInput(inputs.i5)
		this.components.d6.addInput(inputs.i6)
		this.components.d7.addInput(inputs.i7)
	}
}
