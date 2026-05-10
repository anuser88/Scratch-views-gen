const tokens = await fetch("https://raw.githubusercontent.com/anuser88/Scratch-views-gen/main/random_tokens.txt")
	.then(res => res.text())
	.then(text.split(/\r?\n/));

function generateViews(username, projectId, tokens) {
	function inLoop(username, projectId, tokens) {
		let tok = tokens[Math.floor(Math.random()*tokens.length)];
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "https://api.scratch.mit.edu/users/"+username+"/projects/"+projectId+"/views");
		xhr.setRequestHeader("x-csrftoken", tok);
		xhr.send();
	}
	inLoop(username, projectId, tokens);
	setInterval(inLoop, 10000, username, projectId, tokens);
}

try {
	const apiUrl = location.href.replace(
	  "https://scratch.mit.edu/projects/",
	  "https://api.scratch.mit.edu/projects/"
	);

	const meta = await fetch(apiUrl).then(r => r.json());

	var username = meta.author.username;
	var projectId = meta.id.toString();
} catch (err) {
	alert("Unable to get metadata");
	
	var username = prompt("Author username:");
	var projectId = prompt("Project ID:");
} finally {
	generateViews(username, projectId, tokens);
}