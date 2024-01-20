

async function getData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    //body: JSON.stringify(data),
  })
  return response.json()
}

getData('http://localhost:5678/api/works', {
  //"email": "sophie.bluel@test.tld",
  //"password": "S0phie",
  //"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…DI4fQ.2dkOL2Vz8HdgFxha2xzm1RmJjehohb8J3uHWcirGqHk"
}).then((data) => {
  let typesUniques = new Set()
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    //console.log(element);
    const projects = document.querySelector('#projects')
    projects.innerHTML += renderCard(element)
    typesUniques.add(data[i].category.name)
  }

  console.log(typesUniques)
})

async function init() {
  const categories = getData('http://localhost:5678/api/categories').then(
    (data) => {
      const filterZone = document.querySelector('.filter-zone')
      filterZone.innerHTML = ''
      filterZone.innerHTML += `<p><a href="">Tous</a></p>`
      data.forEach((element) => {
        filterZone.innerHTML += `<p><button onclick="filterWorks('` + element.name + `')"> ` + element.name + `</button></p>`
      })
    }
  )
}

function filterWorks(type) {
  getData('http://localhost:5678/api/works', {}).then((data) => {
    const projects = document.querySelector('#projects')
    projects.innerHTML = ''
    if (type === 'Tous') {
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        projects.innerHTML += renderCard(element)
      }
    } else {
      const filteredData = data.filter(
        (element) => element.category.name === type
      )
      for (let i = 0; i < filteredData.length; i++) {
        const element = filteredData[i]

        projects.innerHTML += renderCard(element)
      }
    }
  })
  // Mettre à jour le HTML avec les éléments filtrés
}

function renderCard(element) {
  const figure =
    '<figure><img src="' +
    element.imageUrl +
    '" alt="' +
    element.title +
    '"><figcaption> ' +
    element.title +
    ' </figcaption></figure>'
  return figure
}

init();