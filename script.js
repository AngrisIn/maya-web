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
		try {
			document.getElementById("generate-button").removeChild(loader)
		} catch (error) {
			console.log(error)
		}

		// Enable the button again
		document.getElementById("generate-button").classList.remove("disabled")
	}
}

// Add click event listener to the "Generate Video" button
document
	.getElementById("generate-button")
	.addEventListener("click", async () => {
		simulateLoading()
		await sleep(5000)
		const videoDiv = document.getElementById("generated-video")
		const video = videoDiv.querySelector("video")
		video.src = "sample.mp4"
		video.play()
		stopLoading()
	})

async function sleep(timeInMilliSeconds) {
	return new Promise((resolve) => setTimeout(resolve, timeInMilliSeconds))
}

let assets = [
	{
		thumbnail: "thumbnail1.jpg",
		title: "Helping out dad",
		duration: "2m",
	},
	{
		thumbnail: "thumbnail2.webp",
		title: "Under the Ocean",
		duration: "1m",
	},
]

function constructThumbnail(asset) {
	let thumbnail = document.createElement("div")
	thumbnail.classList.add("thumbnail")

	let img = document.createElement("img")
	img.src = asset.thumbnail
	img.alt = "Video Thumbnail"
	thumbnail.appendChild(img)

	let thumbnailContent = document.createElement("div")
	thumbnailContent.classList.add("thumbnail-content")

	let thumbnailContentTitle = document.createElement("span")
	thumbnailContentTitle.classList.add("thumbnail-content-title")
	thumbnailContentTitle.innerHTML = asset.title
	thumbnailContent.appendChild(thumbnailContentTitle)

	let thumbnailContentDuration = document.createElement("span")
	thumbnailContentDuration.classList.add("thumbnail-content-duration")
	thumbnailContentDuration.innerHTML = asset.duration
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

setTimeout(() => {
	let thumbnails = constructThumbnails(assets)
	let rightColumn = document.getElementById("right-column")
	// in that remove the div with class loader
	rightColumn.removeChild(rightColumn.querySelector(".loader"))
	rightColumn.appendChild(thumbnails)
}, 500)

document
	.getElementById("generate-button")
	.addEventListener("click", async () => {
		simulateLoading()
		await sleep(4000)
		const videoDiv = document.getElementById("generated-video")
		const video = videoDiv.querySelector("video")
		document.querySelector(".videoTitle").innerHTML =
			"Mickey's Messy Mayhem"
		document.querySelector(".videoDescription").innerHTML =
			"Mickey Mouse, Minnie Mouse, and Donald Duck are getting ready for a big clubhouse party, but there's a problem - Mickey's house is a chaotic mess! As they search for party decorations, they stumble upon forgotten toys, misplaced gadgets, and a tangle of wires. Realizing they can't have a party in such disarray, the three friends decide to work together to clean up the mess. Through teamwork and laughter, they tidy up the house, discovering the joy of organizing and the benefits of keeping their home clean. With the house sparkling and the party a success, Mickey and his friends learn that a clean home makes for a happier, more enjoyable time with friends."
		video.src = "sample.mp4"
		stopLoading()
		if (window.innerWidth > 768) {
			window.scrollTo(0, document.body.scrollHeight, "smooth")
		}
	})

async function sleep(timeInMilliSeconds) {
	return new Promise((resolve) => setTimeout(resolve, timeInMilliSeconds))
}
