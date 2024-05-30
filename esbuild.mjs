import * as esbuild from "esbuild"
import { sassPlugin } from "esbuild-sass-plugin"
import http from "http"

let ctx = await esbuild.context({
	entryPoints: ["./index.html", "./src/index.tsx"],
	loader: {
		".html": "copy",
	},
	bundle: true,
	inject: ["./livereload.js"],
	outdir: "build",
	plugins: [sassPlugin()],
})

await ctx.watch()

ctx.serve({
	servedir: "build",
}).then((result) => {
	const { host, port } = result
	// Then start a proxy server on a custom port
	http.createServer((req, res) => {
		const options = {
			hostname: host,
			port: port,
			path: req.url,
			method: req.method,
			headers: req.headers,
		}

		const proxyReq = http.request(options, (proxyRes) => {
			const date = new Date()
			console.log(`${date.toISOString()} - ${req.method} to ${req.url}`)
			if (proxyRes.statusCode === 404) {
				const redirectReq = http.request({ ...options, path: "/" }, (proxyRes) => {
					console.log(`  ↳ redirected to /`)
					// Forward the response from esbuild to the client
					res.writeHead(proxyRes.statusCode, proxyRes.headers)
					proxyRes.pipe(res, { end: true })
				})
				redirectReq.end()
			} else {
				// Forward the response from esbuild to the client
				res.writeHead(proxyRes.statusCode, proxyRes.headers)
				proxyRes.pipe(res, { end: true })
			}
		})

		// Forward the body of the request to esbuild
		req.pipe(proxyReq, { end: true })
	}).listen(1274)
})
