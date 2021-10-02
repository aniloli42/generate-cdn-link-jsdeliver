import LinkGenerator from "./modules/index.js"

const linkGenerate = document.querySelector("#linkGenerate")
const linkField = document.querySelector("#linkField")
const copyButton = document.querySelector("#copyButton")
const generatedLink = document.querySelector("#generatedLink")
const crossMarkBtn = document.querySelector("#crossMarkBtn")

linkGenerate.setAttribute("disabled", "")

// on linkField focus
linkField.addEventListener("focus", () => {
	if (linkField.value === "PASTE YOUR GITHUB LINK HERE") linkField.value = ""
})

linkField.addEventListener("input", () => {
	if (generatedLink !== "// Output goes here") resetAll()

	if (
		linkField.value === "PASTE YOUR GITHUB LINK HERE" ||
		linkField.value === ""
	)
		return linkGenerate.setAttribute("disabled", "")

	if (linkField.value !== "PASTE YOUR GITHUB LINK HERE")
		linkGenerate.removeAttribute("disabled")

	crossMarkBtn.classList.add("show")
})

linkField.addEventListener("blur", () => {
	if (linkField.value === "") {
		linkField.value = "PASTE YOUR GITHUB LINK HERE"
		return linkGenerate.setAttribute("disabled", "")
	}
})

// Handle the Generate Link Button Click
linkGenerate.addEventListener("click", handleGenerateButtonClick)

function handleGenerateButtonClick() {
	// get the link from input link
	const getOutput = LinkGenerator(linkField.value)

	if (!getOutput.status) {
		generatedLink.textContent = getOutput.message
		copyButton.classList.remove("show")
		return
	}

	generatedLink.textContent = getOutput.link
	copyButton.classList.add("show")
}

// Handle Copy Button Click

copyButton.addEventListener("click", handleCopyButtonClick)

function handleCopyButtonClick() {
	const getText = generatedLink.textContent
	navigator.clipboard.writeText(getText).then(
		() => {
			copyButton.textContent = `Copied`
			setTimeout(() => {
				copyButton.textContent = `Copy`
			}, 1000)
		},
		() => {
			copyButton.textContent = `Copied Failed`
			setTimeout(() => {
				copyButton.textContent = `Copy`
			}, 1000)
		}
	)
}

// reset
function resetAll() {
	generatedLink.textContent = `// Output goes here`
	copyButton.classList.remove("show")
	crossMarkBtn.classList.remove("show")
}

// handle crossBtn Click
crossMarkBtn.addEventListener("click", () => {
	resetAll()
	linkGenerate.setAttribute("disabled", "")
	linkField.value = ""
	linkField.focus()
})
