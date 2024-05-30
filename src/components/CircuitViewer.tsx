import React, { useState, useEffect, useRef, MouseEvent, WheelEvent } from "react"
import useWindowDimensions from "./useWindowDimensions.hook"

import "./CircuitViewer.scss"

import Circuit from "~/interfaces/Circuit.interface"

import { Rect, Vec as _Vec } from "~/utils/Utils"

class Vec extends _Vec {
	static fromEvent(event: MouseEvent) {
		return new Vec(event.clientX, event.clientY)
	}
}

// basically all we do is manage a viewport rect via the mouse and wheel events
// we then use the viewport rect parameters to selectively render circuit components

// it also in theory needs a way to interact with certain sources inside the circuit
// through for example key events
// maybe circuits come in some circuit container that specifices the "interface"
// although all interfaces are different of course
// of course the creator of the circuit knows this and can design the interface on a per-circuit basis
// that is probably the difference between a circuit *component* and a circuit itself, no interaction
// even in the case of the full cpu there is only one real "input" (the clock)
// although I do think you need a bootloader somehow to enter the program into memory
export default function CircuitViewer({ circuit }: { circuit: Circuit }) {
	const [zoomLevel, setZoomLevel] = useState<number>(1)
	const [viewPortOrigin, setViewPortOrigin] = useState<Vec>(new Vec(0, 0)) // circuit-specific, store somewhere else
	const [viewPortOffset, setViewPortOffset] = useState<Vec>(new Vec(0, 0))
	const [grabPosition, setGrabPosition] = useState<Vec>(null)
	const { width, height } = useWindowDimensions()
	const [signals, setSignals] = useState<Record<string, boolean>>({})

	const canvas = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		function keyLog(event: KeyboardEvent) {
			if (event.key in circuit.keymap) {
				setSignals({
					...signals,
					[circuit.keymap[event.key]]: !signals[circuit.keymap[event.key]],
				})
			}
		}
		window.addEventListener("keyup", keyLog)

		circuit.updateInternalState(signals)
		return () => {
			window.removeEventListener("keyup", keyLog)
		}
	}, [signals])

	useEffect(() => {
		window.gatecount = 0
		circuit.updateInternalState(signals)
		const ctx = canvas.current.getContext("2d")
		ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)

		// not the place to set up parameters
		// move this somewhere else
		ctx.lineWidth = 2
		ctx.font = "20pt monospace"
		// ctx.fillText(`${viewPortOrigin.y + viewPortOffset.y}`, 20, 60)
		// ctx.fillText(`${canvas.current.width / zoomLevel}`, 20, 100)
		// ctx.fillText(`${canvas.current.height / zoomLevel}`, 20, 140)

		ctx.scale(zoomLevel, zoomLevel)
		circuit.renderer.render(
			ctx,
			new Rect(
				viewPortOrigin.x + viewPortOffset.x,
				viewPortOrigin.y + viewPortOffset.y,
				canvas.current.width / zoomLevel,
				canvas.current.height / zoomLevel,
				zoomLevel
			)
		)

		// reset the zoom to make sure the scaling in the next render does not compound
		ctx.scale(1 / zoomLevel, 1 / zoomLevel)
		ctx.fillText(`Rendered Gates: ${window.gatecount}`, 20, 40)
	})

	function commitViewPortOffset() {
		setViewPortOrigin(new Vec(viewPortOrigin.x + viewPortOffset.x, viewPortOrigin.y + viewPortOffset.y))
		setViewPortOffset(new Vec(0, 0))
	}

	// mouse controls for panning and zooming
	// also manage grippy hand cursor!
	function onMouseMove(event: MouseEvent) {
		// if we are holding down the mouse, dragging the mouse should drag the viewport
		if (grabPosition != null) {
			let currentPosition = Vec.fromEvent(event)
			// calculate some delta from the previous mouse position and apply that transform to the viewport
			const delta = grabPosition.getDelta(currentPosition)
			setViewPortOffset(new Vec(-delta.x / zoomLevel, -delta.y / zoomLevel))
		}
	}
	function onMouseDown(event: MouseEvent) {
		// track the original mouse position from where the "grab" started!
		setGrabPosition(Vec.fromEvent(event))
	}
	function onMouseUp(event: MouseEvent) {
		setGrabPosition(null)
		commitViewPortOffset()
	}

	// zooming needs to update the viewport origin
	// and the viewport width and height
	function onWheel(event: WheelEvent) {
		let new_zoom_level = zoomLevel * ((1000 - event.deltaY) / 1000)
		if (new_zoom_level < 0.01) {
			new_zoom_level = 0.01
		}
		if (new_zoom_level > 3) {
			new_zoom_level = 3
		}

		// update viewport coordinates based on zoom level
		const delta_viewport_height = canvas.current.height / new_zoom_level - canvas.current.height / zoomLevel
		const delta_viewport_width = canvas.current.width / new_zoom_level - canvas.current.width / zoomLevel

		const zoom_origin_horizontal = event.clientX / canvas.current.width
		const zoom_origin_vertizal = event.clientY / canvas.current.height

		setViewPortOrigin(
			new Vec(
				viewPortOrigin.x + zoom_origin_horizontal * delta_viewport_width,
				viewPortOrigin.y + zoom_origin_vertizal * delta_viewport_height
			)
		)

		setZoomLevel(new_zoom_level)
	}

	function onMouseLeave(event: MouseEvent) {
		setGrabPosition(null)
		commitViewPortOffset()
	}

	return (
		<>
			<div className="wrapper">
				<canvas
					ref={canvas}
					width={width}
					height={height}
					onMouseDown={onMouseDown}
					onMouseLeave={onMouseLeave}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onWheel={onWheel}
					style={{ cursor: grabPosition ? "grabbing" : "grab" }}
				></canvas>
			</div>
		</>
	)
}
