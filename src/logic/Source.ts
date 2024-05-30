import Component from "~/interfaces/Component.interface"
import Emitter from "~/interfaces/Emitter.interface"
import Listener from "~/interfaces/Listener.interface"

export default class Source implements Emitter, Component {
	private _value: boolean
	listeners: Listener[] = []
	components: never

	constructor(initialState: boolean) {
		this._value = initialState
	}

	addListener(l: Listener): void {
		this.listeners.push(l)
	}

	setState(s: boolean) {
		this._value = s
		for (const l of this.listeners) {
			l.update()
		}
	}

	get value(): boolean {
		return this._value
	}
}
