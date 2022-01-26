function showRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(function(repos) {
        console.log(repos)
        repos.forEach(repo => {
            let fullName = repo.full_name.split(`${username}/`)[1]

            if(fullName != `${username}` && fullName != `${username}.github.io`){
                let createdAt = repo.created_at.split('T')[0]
                createdAt =  createdAt.split('-')
                let year = createdAt[0]
                let month = createdAt[1]
                let day = createdAt[2]
                let date = `${day}/${month}/${year}`

                let url = repo.html_url

                let description = repo.description == null ? 'No description' : repo.description

                var projectItemElement = document.createElement("div");
                var titleContainerElement = document.createElement("div");
                var topicContainerElement = document.createElement("div");
                var titleElement = document.createElement("h5");
                var urlElement = document.createElement("a");
                var dateElement = document.createElement("p");
                var descriptionElement = document.createElement("p");

                document.getElementById('projects').appendChild(projectItemElement)
                projectItemElement.appendChild(titleContainerElement)
                projectItemElement.appendChild(dateElement)
                projectItemElement.appendChild(descriptionElement)
                titleContainerElement.appendChild(titleElement)
                titleElement.appendChild(urlElement)
                titleContainerElement.appendChild(topicContainerElement)

                projectItemElement.classList.add("project-item")
                titleElement.classList.add("section-subtitle", "m-0")
                dateElement.classList.add("secondary-info")
                titleContainerElement.classList.add("d-flex", "justify-content-between")
                topicContainerElement.classList.add("d-flex", "align-self-center", "topic-list")

                urlElement.href = url
                urlElement.textContent = fullName
                dateElement.textContent = date
                descriptionElement.textContent = description

                repo.topics.forEach(topic => {
                    var topicElement = document.createElement("div");
                    topic = topic.toUpperCase()
                    topicElement.classList.add("topic")
                    if(topic == "IUT")
                        topicElement.classList.add("bg-green")
                    if(topic == "OWN")
                        topicElement.classList.add("bg-orange")
                    topicElement.textContent = topic
                    topicContainerElement.appendChild(topicElement)
                })
            }
        })
        return repos;
      })
    .catch(error => console.log(error))
}

showRepos('7jxlian7')