const VIDEO_API_ENDPOINT = "https://maya-mongo-api.adaptable.app/crud"
const VIDEO_GENERATION_ENDPOINT = "http://localhost:5000"

async function generateVideo(currentStyle, prompt) {
	let styles = {
		"mickey-mouse": "Mickey Mouse",
		spongebob: "SpongeBob",
	}

	let request = await fetch(`${VIDEO_GENERATION_ENDPOINT}/generate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: styles[currentStyle],
			story: prompt,
		}),
	})

	let response = await request.json()

	let videoId = response.uuid
	let title = response.title
	let description = response.description

	let videoURL = `${VIDEO_GENERATION_ENDPOINT}/files/${videoId}.mp4`
	let thumbnailURL = `${VIDEO_GENERATION_ENDPOINT}/files/${videoId}_0.png`

	console.log({videoURL, thumbnailURL, title, description})

	return {
		videoURL,
		thumbnailURL,
		title,
		description
	}

}

// Global variable to store the selected cartoon style
let currentStyle = "mickey-mouse"

// Function to handle button selection
function selectCartoonStyle(style) {
	const buttons = document.querySelectorAll(".cartoon-style-button")
	buttons.forEach((button) => {
		if (button.classList.contains(style)) {
			button.classList.add("selected")
		} else {
			button.classList.remove("selected")
		}
	})
	currentStyle = style
}

// Function to handle button clicks
function handleButtonClick(event) {
	const style = event.target.dataset.style
	selectCartoonStyle(style)
}

// Add click event listeners to buttons
const buttons = document.querySelectorAll(".cartoon-style-button")
buttons.forEach((button) => {
	button.addEventListener("click", handleButtonClick)
})

// Select the default cartoon style (SpongeBob)
selectCartoonStyle(currentStyle)

let stopLoading = false

// Function to simulate loading
function simulateLoading() {
	// Show loader inside the button
	const loader = document.createElement("span")
	loader.classList.add("loader")

	// Remove any existing loaders before adding a new one
	const existingLoader = document.querySelector("#generate-button .loader")
	if (existingLoader) {
		existingLoader.remove()
	}

	document.getElementById("generate-button").appendChild(loader)

	// Disable the button during loading
	document.getElementById("generate-button").classList.add("disabled")

	stopLoading = () => {
		// Remove loader
		document.getElementById("generate-button").removeChild(loader)

		// Enable the button again
		document.getElementById("generate-button").classList.remove("disabled")
	}
}

// Add click event listener to the "Generate Video" button
document
	.getElementById("generate-button")
	.addEventListener("click", async () => {
		simulateLoading()

		const prompt = document.getElementById("user-prompt").value
		const { videoURL, thumbnailURL, title, description } =
			await generateVideo(currentStyle, prompt)

		const videoDiv = document.getElementById("generated-video")
		const video = videoDiv.querySelector("video")

		video.src = videoURL
		video.poster = thumbnailURL
		video.load()

		setTitleAndDescription(title, description)
		stopLoading()
	})

async function sleep(timeInMilliSeconds) {
	return new Promise((resolve) => setTimeout(resolve, timeInMilliSeconds))
}

function setTitleAndDescription(title, description) {
	document.querySelector(".videoTitle").innerHTML = title
	document.querySelector(".videoDescription").innerHTML = description
}

function constructThumbnail(asset) {
	let thumbnail = document.createElement("div")
	thumbnail.classList.add("thumbnail")

	let img = document.createElement("img")
	img.src = `${VIDEO_GENERATION_ENDPOINT}/${asset.uuid}_0.png`
	img.classList.add("thumbnail-image")
	img.alt = asset.episodeTitle
	thumbnail.appendChild(img)

	let thumbnailContent = document.createElement("div")
	thumbnailContent.classList.add("thumbnail-content")

	let thumbnailContentTitle = document.createElement("span")
	thumbnailContentTitle.classList.add("thumbnail-content-title")
	thumbnailContentTitle.innerHTML = asset.episodeTitle
	thumbnailContent.appendChild(thumbnailContentTitle)

	let thumbnailContentDuration = document.createElement("span")
	thumbnailContentDuration.classList.add("thumbnail-content-duration")
	thumbnailContentDuration.innerHTML = asset.duration + "s"
	thumbnailContent.appendChild(thumbnailContentDuration)

	thumbnail.appendChild(thumbnailContent)

	return thumbnail
}

function constructThumbnails(assets) {
	let thumbnails = document.createElement("div")
	thumbnails.classList.add("thumbnails")

	assets.forEach((asset) => {
		let thumbnail = constructThumbnail(asset)
		thumbnails.appendChild(thumbnail)
	})

	return thumbnails
}

setTimeout(async () => {
	let response = await fetch(`${VIDEO_API_ENDPOINT}/all`)
	let assets = await response.json()

	let thumbnails = constructThumbnails(assets)
	let rightColumn = document.getElementById("right-column")
	rightColumn.removeChild(rightColumn.querySelector(".loader"))
	rightColumn.appendChild(thumbnails)
})

document.addEventListener("click", (event) => {
	if (
		event.target.classList.contains("thumbnail-content-duration") ||
		event.target.classList.contains("thumbnail-content-title") ||
		event.target.classList.contains("thumbnail-content") ||
		event.target.classList == "thumbnail-image" 
	) {

		let thumbnail = event.target
		while (!thumbnail.classList.contains("thumbnail")) {
			thumbnail = thumbnail.parentNode
		}

		let img = thumbnail.querySelector(".thumbnail-image")
		let videoURL = img.src.replace("_0.png", ".mp4")
		window.open(videoURL, "_blank")
	}
})
