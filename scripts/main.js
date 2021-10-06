// Import the linkGenerator using import module
import LinkGenerator from "./modules/index.js"

// Get the elements from HTML DOM
const linkGenerate = document.querySelector("#linkGenerate")
const linkField = document.querySelector("#linkField")
const copyButton = document.querySelector("#copyButton")
const generatedLink = document.querySelector("#generatedLink")
const crossMarkBtn = document.querySelector("#crossMarkBtn")

// set default disabled attribute to linkGenerate Button
linkGenerate.setAttribute("disabled", "")

// on linkField focus
linkField.addEventListener("focus", () => {
	if (linkField.value === "PASTE YOUR GITHUB LINK HERE") linkField.value = ""
})

// listening the user input
linkField.addEventListener("input", () => {
	//change the textarea height according to user text
	linkField.style.height = "auto"
	linkField.style.height = linkField.scrollHeight + "px"

	// if user already generate link and type again in the text field then change to default text
	if (generatedLink !== "// Output goes here") resetAll()

	// if user remove all text from textarea then add disable attribute in linkGenerate button
	if (
		linkField.value === "PASTE YOUR GITHUB LINK HERE" ||
		linkField.value === ""
	)
		return linkGenerate.setAttribute("disabled", "")

	// if user start to type then remove the linkGenerate disable attribute
	if (linkField.value !== "PASTE YOUR GITHUB LINK HERE")
		linkGenerate.removeAttribute("disabled")

	// show the reset all button when textarea is not empty
	crossMarkBtn.classList.add("show")
})

// listen the user move focus from textarea
linkField.addEventListener("blur", () => {
	// if user left textbox empty, set to default text and disable the linkGenerate Button
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

	// if return status from LinkGenerator then show the error message
	if (!getOutput.status) {
		generatedLink.textContent = getOutput.message
		copyButton.classList.remove("show")
		return
	}

	// if return status is true then show generated link
	generatedLink.textContent = getOutput.link
	copyButton.classList.add("show")
}

// Handle Copy Button Click

copyButton.addEventListener("click", handleCopyButtonClick)

function handleCopyButtonClick() {
	// remove the disabled mode generatedLink to copy the text through script
	generatedLink.removeAttribute("disabled")

	// select all the text generatedLink
	generatedLink.select()

	// execute the copy command
	document.execCommand("Copy")

	// remove the select text
	window.getSelection().removeAllRanges()

	// add disabled attribute to generatedLink
	generatedLink.setAttribute("disabled", "")

	// change the copy button text to Copied for user to confirm the copy
	copyButton.textContent = `Copied`

	// change text to default text after 1 sec
	setTimeout(() => (copyButton.textContent = `Copy`), 1000)
}

// reset functionality
function resetAll() {
	generatedLink.textContent = `// Output goes here`
	copyButton.classList.remove("show")
	crossMarkBtn.classList.remove("show")
}

// handle crossBtn Click, change the textarea to default state
crossMarkBtn.addEventListener("click", () => {
	resetAll()
	linkGenerate.setAttribute("disabled", "")
	linkField.value = ""
	linkField.style.height = "auto"
	linkField.focus()
})
