window.addEventListener('load', init);

function init() {
    const input = document.getElementById('input');
    const suggest = document.getElementById('suggest');
    let myRepos = new Map();
    let t;

    input.addEventListener('input', (e) => {
        const value = e.target.value;

        if (t) { clearTimeout(t) }

        t = setTimeout(async() => {
            const url = `https://api.github.com/search/repositories?q=${value}&per_page=5`
            const options = { 
                headers: {
                    'Content-Type': 'application/vnd.github+json',
                }
            }

            suggest.innerHTML = '';
            myRepos = new Map();

            const data = await fetch(url, options)
            const repos = await data.json();
            if (!repos?.items?.length) { return }

            repos.items.forEach((r) => {
                const el = document.createElement('div');
                el.classList.add('search__suggest-item');
                el.innerText = r.name
                myRepos.set(el, r)
                suggest.appendChild(el)
            })

        }, 500)
    });


    suggest.addEventListener('click', (e) => {
        const r = myRepos.get(e.target);

        const repInfo = document.createElement('div');
        rep.appendChild(repInfo)
        repInfo.classList.add('repInfo')

        const repName = document.createElement('span');
        repName.innerText = `Name: ${r.name}`;

        const repOwner = document.createElement('span');
        repOwner.innerText = `Owner: ${r.owner.login}`;

        const repStars = document.createElement('span');
        repStars.innerText = `Stars: ${r.stargazers_count}`;

        const close = document.createElement('button');
        close.classList.add('close')
        close.onclick = function(e) {
            const btn = e.target.closest('.close');
            if(!btn) return;
            btn.parentElement.remove();
        }
        
        repInfo.appendChild(repName)
        
        repInfo.appendChild(repOwner)
        
        repInfo.appendChild(repStars)
        
        repInfo.appendChild(close)
    })
}

