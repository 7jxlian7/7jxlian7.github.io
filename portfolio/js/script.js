// The GitHub user
const user = '7jxlian7'

/**
 * Show the GitHub projects in the projects section
 * @param {String} username - GitHub's username
 */
function showRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(function(repos) {
        repos.forEach(repo => {
            let projectName = repo.name
            if(projectName != `${username}` && projectName != `${username}.github.io`){
                let projectItemElement = document.createElement("div")
                createProjectItem(projectItemElement, repo)
                document.getElementById('projects').appendChild(projectItemElement)
            }
        })
      })
    .catch(error => console.log(error))
}

/**
 * Convert a non-formatted date to a formatted one
 * @param {String} str_date - not formatted date
 * @returns a formatted date dd/mm/yyyy
 */
function getFormattedDate(str_date){
    let date = str_date.split('T')[0]
    date = date.split('-')
    return `${date[2]}/${date[1]}/${date[0]}`;
}

/**
 * Create a project item HTML Element
 * @param {HTMLDivElement} projectItemElement 
 * @param {Array} repo 
 */
function createProjectItem(projectItemElement, repo){
    let titleContainerElement = document.createElement("div"),
        topicContainerElement = document.createElement("div"),
        titleElement = document.createElement("h5"),
        urlElement = document.createElement("a"),
        dateCreatedElement = document.createElement("p"),
        descriptionElement = document.createElement("p"),
        starsElement = document.createElement("p"),
        starsIcon = document.createElement("i"),
        forksElement = document.createElement("p"),
        forksIcon = document.createElement("i"),
        lastUpdateElement = document.createElement("p");

    projectItemElement.append(titleContainerElement, dateCreatedElement,descriptionElement, starsElement, starsIcon, forksElement, forksIcon, lastUpdateElement, )
    titleContainerElement.append(titleElement, topicContainerElement)
    titleElement.appendChild(urlElement)

    projectItemElement.classList.add("project-item")
    titleElement.classList.add("section-subtitle", "m-0")
    dateCreatedElement.classList.add("secondary-info")
    titleContainerElement.classList.add("d-flex", "justify-content-between")
    topicContainerElement.classList.add("d-flex", "align-self-center", "topic-list")
    starsIcon.classList.add("bi", "bi-star-fill", "star"),
    starsElement.classList.add("d-inline", "me-1"),
    forksElement.classList.add("d-inline", "me-1")
    forksIcon.classList.add("bi", "bi-bezier", "fork"),
    lastUpdateElement.classList.add("mt-3", "secondary-info")

    urlElement.href = repo.html_url
    urlElement.textContent = repo.name
    dateCreatedElement.textContent = getFormattedDate(repo.created_at)
    descriptionElement.textContent = repo.description != null ? repo.description : "No description"
    starsElement.textContent = repo.stargazers_count
    forksElement.textContent = repo.forks_count
    lastUpdateElement.textContent = `Last update on ${getFormattedDate(repo.pushed_at)}`

    repo.topics.forEach(topic => {
        var topicElement = document.createElement("div");
        topic = topic.toUpperCase()
        topicElement.classList.add("topic")
        if(topic == "IUT")
            topicElement.classList.add("iut-bg")
        if(topic == "OWN")
            topicElement.classList.add("own-bg")
        topicElement.textContent = topic
        topicContainerElement.appendChild(topicElement)
    })
}

/**
 * When document is loaded
 */
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('year').innerHTML = new Date().getFullYear();
    showRepos(user)

    /**
     * Set a random color when hover icons
     */
    var icons = document.getElementsByClassName('rand-color');
    for(let i = 0; i < icons.length; i++){
        icons[i].onmouseover = function(e) {
            let random_color = '#'+Math.floor(Math.random()*16777215).toString(16);
            this.style = "color: " + random_color + ";";
        }
        icons[i].onmouseout = function(e) {
            this.style = "color: var(--icons-color);";
        }
    }
});
