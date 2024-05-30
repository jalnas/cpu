import Component from "~/interfaces/Component.interface"
import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"

abstract class GateRenderer implements Renderer {
	x: number
	y: number
	dir: RenderDirection
	component: Component
	width: number
	height: number
	renderers?: Record<string, Renderer>

	constructor(gate: Component, x: number, y: number, dir: RenderDirection) {
		this.x = x
		this.y = y
		this.dir = dir
		this.component = gate
	}

	// if we call render, do we always render?
	abstract render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void

	inViewport(vp: ViewportRect): boolean {
		return vp.intersects(this.x, this.y, this.width, this.height)
	}
}

export class NOTGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()
		if (this.dir == RenderDirection.RIGHT) {
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x + 34, this.y + 20)
			ctx.arc(this.x + 37, this.y + 20, 3, Math.PI, Math.PI * 3, false)
			ctx.lineTo(this.x, this.y + 40)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x + 20, this.y + 34)
			ctx.arc(this.x + 20, this.y + 37, 3, -Math.PI / 2, Math.PI * 3, false)
			ctx.lineTo(this.x + 40, this.y)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.moveTo(this.x + 40, this.y)
			ctx.lineTo(this.x + 6, this.y + 20)
			ctx.arc(this.x + 3, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.lineTo(this.x + 40, this.y + 40)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.moveTo(this.x, this.y + 40)
			ctx.lineTo(this.x + 20, this.y + 6)
			ctx.arc(this.x + 20, this.y + 3, 3, Math.PI / 2, Math.PI * 3, false)
			ctx.lineTo(this.x + 40, this.y + 40)
		}

		ctx.closePath()
		ctx.stroke()

		ctx.restore()
	}
}

export class ORGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()
		if (this.dir == RenderDirection.RIGHT) {
			ctx.moveTo(this.x - 3, this.y)
			ctx.bezierCurveTo(this.x + 2, this.y + 10, this.x + 2, this.y + 30, this.x - 3, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 30, this.y + 35, this.x + 40, this.y + 20)
			ctx.moveTo(this.x - 3, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 30, this.y + 5, this.x + 40, this.y + 20)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.moveTo(this.x, this.y - 3)
			ctx.bezierCurveTo(this.x + 10, this.y + 2, this.x + 30, this.y + 2, this.x + 40, this.y - 3)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 30, this.x + 20, this.y + 40)
			ctx.moveTo(this.x, this.y - 3)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 30, this.x + 20, this.y + 40)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.moveTo(this.x + 43, this.y)
			ctx.bezierCurveTo(this.x + 38, this.y + 10, this.x + 38, this.y + 30, this.x + 43, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 10, this.y + 35, this.x, this.y + 20)
			ctx.moveTo(this.x + 43, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 10, this.y + 5, this.x, this.y + 20)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.moveTo(this.x, this.y + 43)
			ctx.bezierCurveTo(this.x + 10, this.y + 38, this.x + 30, this.y + 38, this.x + 40, this.y + 43)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 10, this.x + 20, this.y)
			ctx.moveTo(this.x, this.y + 43)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 10, this.x + 20, this.y)
		}

		ctx.stroke()
		ctx.restore()
	}
}

export class NORGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()
		if (this.dir == RenderDirection.RIGHT) {
			ctx.arc(this.x + 37, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x - 3, this.y)
			ctx.bezierCurveTo(this.x + 2, this.y + 10, this.x + 2, this.y + 30, this.x - 3, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 30, this.y + 35, this.x + 34, this.y + 20)
			ctx.moveTo(this.x - 3, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 30, this.y + 5, this.x + 34, this.y + 20)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.arc(this.x + 20, this.y + 37, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y - 3)
			ctx.bezierCurveTo(this.x + 10, this.y + 2, this.x + 30, this.y + 2, this.x + 40, this.y - 3)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 30, this.x + 20, this.y + 34)
			ctx.moveTo(this.x, this.y - 3)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 30, this.x + 20, this.y + 34)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.arc(this.x + 3, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x + 43, this.y)
			ctx.bezierCurveTo(this.x + 38, this.y + 10, this.x + 38, this.y + 30, this.x + 43, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 10, this.y + 35, this.x + 6, this.y + 20)
			ctx.moveTo(this.x + 43, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 10, this.y + 5, this.x + 6, this.y + 20)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.arc(this.x + 20, this.y + 3, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y + 43)
			ctx.bezierCurveTo(this.x + 10, this.y + 38, this.x + 30, this.y + 38, this.x + 40, this.y + 43)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 10, this.x + 20, this.y + 6)
			ctx.moveTo(this.x, this.y + 43)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 10, this.x + 20, this.y + 6)
		}
		ctx.stroke()

		ctx.restore()
	}
}

export class ANDGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()

		if (this.dir == RenderDirection.RIGHT) {
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x + 20, this.y)
			ctx.arc(this.x + 20, this.y + 20, 20, -Math.PI / 2, Math.PI / 2, false)
			ctx.lineTo(this.x, this.y + 40)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x, this.y + 20)
			ctx.arc(this.x + 20, this.y + 20, 20, Math.PI, 0, true)
			ctx.lineTo(this.x + 40, this.y)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.moveTo(this.x + 40, this.y)
			ctx.lineTo(this.x + 20, this.y)
			ctx.arc(this.x + 20, this.y + 20, 20, -Math.PI / 2, Math.PI / 2, true)
			ctx.lineTo(this.x + 40, this.y + 40)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.moveTo(this.x, this.y + 40)
			ctx.lineTo(this.x, this.y + 20)
			ctx.arc(this.x + 20, this.y + 20, 20, Math.PI, 0, false)
			ctx.lineTo(this.x + 40, this.y + 40)
		}

		ctx.closePath()
		ctx.stroke()

		ctx.restore()
	}
}

export class NANDGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()

		if (this.dir == RenderDirection.RIGHT) {
			ctx.arc(this.x + 37, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x + 15, this.y)
			ctx.arc(this.x + 14, this.y + 20, 20, -Math.PI / 2, Math.PI / 2, false)
			ctx.lineTo(this.x, this.y + 40)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.arc(this.x + 20, this.y + 37, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y)
			ctx.lineTo(this.x, this.y + 14)
			ctx.arc(this.x + 20, this.y + 14, 20, Math.PI, 0, true)
			ctx.lineTo(this.x + 40, this.y)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.arc(this.x + 3, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x + 40, this.y)
			ctx.lineTo(this.x + 26, this.y)
			ctx.arc(this.x + 26, this.y + 20, 20, -Math.PI / 2, Math.PI / 2, true)
			ctx.lineTo(this.x + 40, this.y + 40)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.arc(this.x + 20, this.y + 3, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y + 40)
			ctx.lineTo(this.x, this.y + 26)
			ctx.arc(this.x + 20, this.y + 26, 20, Math.PI, 0, false)
			ctx.lineTo(this.x + 40, this.y + 40)
		}

		ctx.closePath()
		ctx.stroke()

		ctx.restore()
	}
}

export class XORGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()

		if (this.dir == RenderDirection.RIGHT) {
			ctx.moveTo(this.x - 3, this.y)
			ctx.bezierCurveTo(this.x + 2, this.y + 10, this.x + 2, this.y + 30, this.x - 3, this.y + 40)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x + 5, this.y + 10, this.x + 5, this.y + 30, this.x, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 30, this.y + 35, this.x + 40, this.y + 20)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 30, this.y + 5, this.x + 40, this.y + 20)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.moveTo(this.x, this.y - 3)
			ctx.bezierCurveTo(this.x + 10, this.y + 2, this.x + 30, this.y + 2, this.x + 40, this.y - 3)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x + 10, this.y + 5, this.x + 30, this.y + 5, this.x + 40, this.y)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 30, this.x + 20, this.y + 40)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 30, this.x + 20, this.y + 40)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.moveTo(this.x + 43, this.y)
			ctx.bezierCurveTo(this.x + 38, this.y + 10, this.x + 38, this.y + 30, this.x + 43, this.y + 40)
			ctx.moveTo(this.x + 40, this.y)
			ctx.bezierCurveTo(this.x + 35, this.y + 10, this.x + 35, this.y + 30, this.x + 40, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 10, this.y + 35, this.x, this.y + 20)
			ctx.moveTo(this.x + 40, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 10, this.y + 5, this.x, this.y + 20)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.moveTo(this.x, this.y + 43)
			ctx.bezierCurveTo(this.x + 10, this.y + 38, this.x + 30, this.y + 38, this.x + 40, this.y + 43)
			ctx.moveTo(this.x, this.y + 40)
			ctx.bezierCurveTo(this.x + 10, this.y + 35, this.x + 30, this.y + 35, this.x + 40, this.y + 40)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 10, this.x + 20, this.y)
			ctx.moveTo(this.x, this.y + 40)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 10, this.x + 20, this.y)
		}

		ctx.stroke()

		ctx.restore()
	}
}

export class XNORGateRenderer extends GateRenderer {
	width = 40
	height = 40

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		window.gatecount++
		ctx.save()
		ctx.translate(vp.x, vp.y)

		//ctx.strokeRect(this.x, this.y, this.width, this.height)

		ctx.beginPath()
		if (this.dir == RenderDirection.RIGHT) {
			ctx.arc(this.x + 37, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x - 3, this.y)
			ctx.bezierCurveTo(this.x + 2, this.y + 10, this.x + 2, this.y + 30, this.x - 3, this.y + 40)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x + 5, this.y + 10, this.x + 5, this.y + 30, this.x, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 30, this.y + 35, this.x + 34, this.y + 20)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 30, this.y + 5, this.x + 34, this.y + 20)
		}
		if (this.dir == RenderDirection.DOWN) {
			ctx.arc(this.x + 20, this.y + 37, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y - 3)
			ctx.bezierCurveTo(this.x + 10, this.y + 2, this.x + 30, this.y + 2, this.x + 40, this.y - 3)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x + 10, this.y + 5, this.x + 30, this.y + 5, this.x + 40, this.y)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 30, this.x + 20, this.y + 34)
			ctx.moveTo(this.x, this.y)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 30, this.x + 20, this.y + 34)
		}
		if (this.dir == RenderDirection.LEFT) {
			ctx.arc(this.x + 3, this.y + 20, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x + 43, this.y)
			ctx.bezierCurveTo(this.x + 38, this.y + 10, this.x + 38, this.y + 30, this.x + 43, this.y + 40)
			ctx.moveTo(this.x + 40, this.y)
			ctx.bezierCurveTo(this.x + 35, this.y + 10, this.x + 35, this.y + 30, this.x + 40, this.y + 40)
			ctx.bezierCurveTo(this.x + 20, this.y + 40, this.x + 10, this.y + 35, this.x + 6, this.y + 20)
			ctx.moveTo(this.x + 40, this.y)
			ctx.bezierCurveTo(this.x + 20, this.y, this.x + 10, this.y + 5, this.x + 6, this.y + 20)
		}
		if (this.dir == RenderDirection.UP) {
			ctx.arc(this.x + 20, this.y + 3, 3, 0, Math.PI * 2, false)
			ctx.moveTo(this.x, this.y + 43)
			ctx.bezierCurveTo(this.x + 10, this.y + 38, this.x + 30, this.y + 38, this.x + 40, this.y + 43)
			ctx.moveTo(this.x, this.y + 40)
			ctx.bezierCurveTo(this.x + 10, this.y + 35, this.x + 30, this.y + 35, this.x + 40, this.y + 40)
			ctx.bezierCurveTo(this.x + 40, this.y + 20, this.x + 35, this.y + 10, this.x + 20, this.y + 6)
			ctx.moveTo(this.x, this.y + 40)
			ctx.bezierCurveTo(this.x, this.y + 20, this.x + 5, this.y + 10, this.x + 20, this.y + 6)
		}

		ctx.stroke()

		ctx.restore()
	}
}
