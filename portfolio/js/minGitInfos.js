function showRepos(e){return fetch(`https://api.github.com/users/${e}/repos`).then(e=>e.json()).then(function(t){return console.log(t),t.forEach(t=>{let n=t.full_name.split(`${e}/`)[1];if(n!=`${e}`&&n!=`${e}.github.io`){let e=t.created_at.split("T")[0],h=(e=e.split("-"))[0],C=e[1],f=`${e[2]}/${C}/${h}`,E=t.owner.login,L=t.html_url,b=null==t.description?"No description":t.description,$=t.stargazers_count,g=t.forks_count;var d=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div"),a=document.createElement("h5"),l=document.createElement("a"),c=document.createElement("p"),o=document.createElement("p"),p=document.createElement("p"),r=document.createElement("i"),m=document.createElement("p"),u=document.createElement("i");document.getElementById("projects").appendChild(d),d.appendChild(i),d.appendChild(c),d.appendChild(o),d.appendChild(p),d.appendChild(r),d.appendChild(m),d.appendChild(u),i.appendChild(a),a.appendChild(l),i.appendChild(s),d.classList.add("project-item"),a.classList.add("section-subtitle","m-0"),c.classList.add("secondary-info"),i.classList.add("d-flex","justify-content-between"),s.classList.add("d-flex","align-self-center","topic-list"),p.classList.add("d-inline","me-1"),r.classList.add("bi","bi-star-fill","star"),m.classList.add("d-inline","me-1"),u.classList.add("bi","bi-bezier","fork"),l.href=L,l.textContent=n,c.textContent=`${f} - ${E}`,o.textContent=b,p.textContent=`${$}`,m.textContent=`${g}`,t.topics.forEach(e=>{var t=document.createElement("div");e=e.toUpperCase(),t.classList.add("topic"),"IUT"==e&&t.classList.add("iut-bg"),"OWN"==e&&t.classList.add("own-bg"),t.textContent=e,s.appendChild(t)})}}),t}).catch(e=>console.log(e))}showRepos("7jxlian7");