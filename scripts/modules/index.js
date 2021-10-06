// Convert github file into jsdeliver cdn link, with or without minify
// Supported file: Javascript and CSS

const getCDNLink = (link, isMinify = false) => {
	if (link.includes("https://")) link = link.slice(8)
	if (link.includes("http://")) link = link.slice(7)

	const linkParts = link.split("/")

	console.log(link, linkParts.length)

	if (linkParts.length < 7)
		return { status: false, message: "Link Invalid or link not supported" }

	const isGithubLink = linkParts.includes("github.com")
	const indexOfGithub = linkParts.indexOf("github.com")

	// check the link is related github or not
	if (!isGithubLink)
		return { status: false, message: "This is not Github link." }

	let fileName = linkParts[linkParts.length - 1]

	// get the extension name
	let checkExtension = fileName.split(".")[1]

	// check the extension of javascript or css if not then throw error
	if (!(checkExtension === "js" || checkExtension === "css"))
		return {
			status: false,
			message: "Not supported file. Make sure must be CSS or JavaScript"
		}

	const githubAccount = linkParts[indexOfGithub + 1]
	const repoName = linkParts[indexOfGithub + 2]
	const branchType = linkParts[indexOfGithub + 4]
	let directoryPath = linkParts
		.slice(indexOfGithub + 5, linkParts.length - 1)
		.toString()
		.replace(/,/g, "/")

	// check file is in inner directory, if yes then add
	if (directoryPath !== "") directoryPath = `/${directoryPath}`

	// if isMinify is true then change the file to compressed file
	if (isMinify) {
		fileName = fileName.replace(/\./, ".min.")
	}

	// concat all the parts and generate the link and return it
	return {
		status: true,
		link: `https://cdn.jsdelivr.net/gh/${githubAccount}/${repoName}@${branchType}${directoryPath}/${fileName}`
	}
}

export default getCDNLink
