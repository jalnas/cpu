import Listener from "~/interfaces/Listener.interface"
import Emitter from "~/interfaces/Emitter.interface"

import { TriStateBuffer } from "./TriStateBuffer"

// Bus nets are required as an intermediary value container where multiple tri-state buffers are sharing the same output.
// listeners of the bus don't have to implement their own tri-state check logic since the bus is a normal Emitter
// We also arbitrarily choose to pull the bus low when all inputs are high-impedance
export class Bus implements Emitter, Listener {
	_value: boolean = false
	_conflict: boolean
	listeners: Listener[] = []
	inputs: TriStateBuffer[] = []

	// Should we allow immediate adding of inputs?
	constructor() {
		this._value = false
	}

	addInput(input: TriStateBuffer) {
		input.addListener(this)
		this.inputs.push(input)
	}

	addListener(l: Listener): void {
		this.listeners.push(l)
	}

	// enumerate all inputs
	output(): NonNullable<boolean> {
		// reset the conflict flag
		this._conflict = false

		let output: boolean = null
		for (const input of this.inputs) {
			if (input !== null) {
				if (output !== null) {
					// there is some conflict in the net since we have two non-null outputs at the same time
					// even if the outputs are the same, it's still not supposed to happen
					// this is undefined behavior and we'll just let the loop proceed
					this._conflict = true
				}
				if (input) {
					output = true
				} else {
					output = false
				}
			}
		}

		// if all inputs to the bus are high-impedance (null) we drive the bus low
		if (output === null) {
			return false
		} else {
			return output
		}
	}

	update(): void {
		this._value = this.output()
	}

	get value(): boolean {
		return this._value
	}
}
