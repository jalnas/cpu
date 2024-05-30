import Listener from "~/interfaces/Listener.interface"
import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"

// Tri-state buffers can output three types of signals, high, low, and floating (or high-impedance) (null)
// This enables multiple tri-state buffers to share the same data line without interfering with the output of the others
// i.e. writing a zero and a one at the same time
export class TriStateBuffer implements Emitter, Listener, Component {
	private _value: boolean = null
	private input: Emitter
	private enable: Emitter
	listeners: Listener[] = []

	constructor(input: Emitter, enable: Emitter) {
		input.addListener(this)
		enable.addListener(this)

		this.input = input
		this.enable = enable

		this._value = this.output()
	}

	addListener(l: Listener): void {
		this.listeners.push(l)
	}

	output(): boolean {
		if (this.enable.value) {
			return this.input.value
		} else {
			return null
		}
	}

	update(): void {
		//console.log("Updating tristate buffer", this)
		const output = this.output()
		if (this._value != output) {
			this._value = output
			for (const l of this.listeners) {
				l.update()
			}
		}
	}

	get value(): boolean {
		return this._value
	}
}
