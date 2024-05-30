import Listener from "./Listener.interface"

export default interface Emitter {
	listeners: Listener[]

	addListener(n: Listener): void
	get value(): boolean | null
}
