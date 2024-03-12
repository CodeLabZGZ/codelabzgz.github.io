import pino from "pino"

const transport = pino.transport({
	targets: [
		{
			target: "pino-pretty",
			options: {
				destination: process.stdout.fd
			}
		},
		{
			target: "pino-pretty",
			options: {
				destination: "./logs/output.log",
				mkdir: true,
				colorize: false
			}
		}
	]
})

export const logger = pino({
	level: process.env.LOG_LEVEL || "info",
	transport
})