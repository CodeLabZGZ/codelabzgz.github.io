import { defineConfig } from "cypress"

export default defineConfig({
	video: false,
	screenshotOnRunFailure: false,
	env: { ...process.env },
	e2e: {
		baseUrl: "http://localhost:3000"
	}
})