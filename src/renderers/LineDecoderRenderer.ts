import Renderer, { RenderDirection, ViewportRect } from "~/interfaces/Renderer.interface"
import { LineDecoder } from "~/logic/circuits/LineDecoder"
import { NOTGateRenderer } from "./GateRenderers"
import { EightInputANDRenderer } from "./EightInputANDRenderer"
import NetRenderer from "./NetRenderer"

export class LineDecoderRenderer implements Renderer {
	x: number
	y: number
	width: number = 940
	height: number = 41060
	component: LineDecoder

	renderers: Record<string, Renderer> = {}

	constructor(ld: LineDecoder, x: number, y: number) {
		this.x = x
		this.y = y
		this.component = ld

		// we need power lines for the inputs, not gates, and a whole host of eight input ands
		for (let i = 0; i < 8; i++) {
			this.renderers[`neti${i}`] = new NetRenderer(ld.inputs[`i${i}`], [
				[
					[this.x + 50 + 60 * i, this.y],
					[0, this.height - 10 - (7 - i) * 20],
				],
				[
					[this.x + 50 + 60 * i, this.y + 20],
					[-30, 0],
					[0, 20],
				],
			])
			this.renderers[`netno${i}`] = new NetRenderer(ld.components[`not${i}`], [
				[
					[this.x + 20 + 60 * i, this.y + 80],
					[0, this.height - 90 - (7 - i) * 20 - (1 << (7 - i)) * 160],
				],
			])
			this.renderers[`not${i}`] = new NOTGateRenderer(
				ld.components[`not${i}`],
				this.x + 60 * i,
				this.y + 40,
				RenderDirection.DOWN
			)
		}

		// and 8 input and renderers with lines!!
		for (let i = 0; i < 256; i++) {
			this.renderers[`eia${i}`] = new EightInputANDRenderer(ld.out[i], this.x + 500, this.y + 100 + 160 * i)
			for (let j = 0; j < 8; j++) {
				// if this line is connected to the regular or the inverted input
				if (i & (0x80 >> j)) {
					this.renderers[`eia${i}net${j}`] = new NetRenderer(
						ld.inputs[`i${j}`],
						[
							[
								[this.x + 50 + j * 60, this.y + 110 + 160 * i + 20 * j],
								[450 - 60 * j, 0],
							],
						],
						i < 255
					)
				} else {
					this.renderers[`eia${i}net${j}`] = new NetRenderer(
						ld.components[`not${j}`],
						[
							[
								[this.x + 20 + j * 60, this.y + 110 + 160 * i + 20 * j],
								[480 - 60 * j, 0],
							],
						],
						true // this is incorrect, some voodoo is required
					)
				}
			}
		}
	}

	render(ctx: CanvasRenderingContext2D, vp: ViewportRect): void {
		ctx.save()
		// we first do object-specific rendering
		if (vp.z < 0.1) {
			ctx.lineWidth = 40
			ctx.font = "600pt sans-serif"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.translate(vp.x, vp.y)
			ctx.strokeRect(this.x, this.y, this.width, this.height)
			ctx.translate(this.x, this.y)
			ctx.rotate(-Math.PI / 2)
			ctx.fillText("8:256 Line Decoder", -this.height / 2, this.width / 2)
			ctx.rotate(Math.PI / 2)
			ctx.translate(-this.x, -this.y)
			ctx.translate(-vp.x, -vp.y)
		} else {
			// ctx.translate(vp.x, vp.y)
			// ctx.strokeRect(this.x, this.y, this.width, this.height)
			// ctx.translate(-vp.x, -vp.y)
			// then call the sub-renderers
			for (const r of Object.values(this.renderers)) {
				if (r.inViewport(vp)) {
					r.render(ctx, vp)
				}
			}
		}

		ctx.restore()
	}

	inViewport(vp: ViewportRect): boolean {
		return true
	}
}
