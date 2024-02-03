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
    referrerPolicy: 'no-referrer'
  })
  return response.json()
}

async function deleteData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNjE5NzI0OCwiZXhwIjoxNzA2MjgzNjQ4fQ.u0pc7mEEonc_WRYmdoxLGatMlfYx4XLYYisN5K2gm1E'
    },
  })
  return response.json()
}


getData('http://localhost:5678/api/works', {
  //"email": "sophie.bluel@test.tld",
  //"password": "S0phie",
}).then((data) => {
  let typesUniques = new Set()
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const projects = document.querySelector('#projects')
    projects.innerHTML += renderCard(element)
    typesUniques.add(data[i].category.name)

    const modal = document.getElementById("images-list");
    modal.innerHTML += renderModal(element)

    let modalImage = document.getElementById(element.id);
    modalImage.addEventListener('click', function() {
      modalImage.parentNode.removeChild(modalImage);
    });
  }
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

function renderModal(element) {
  const figure2 =
   '<span id="span' + element.id + '"><img src="' 
   +element.imageUrl + 
   '" alt="' +
   element.title +
   '" style="width: 80px"> <i id="'
   + element.id + 
   '" class="fas fa-trash-alt"></i></span>'
   return figure2
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

// Modal

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementById("close");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const imagesList = document.getElementById ("images-list")
imagesList.addEventListener("click", function(event) {
  if (event.target.classList.contains('fa-trash-alt')) {
    const id = event.target.id 
    deleteData ('http://localhost:5678/api/works/' + id, {}).then ((data) =>{
      
      console.log(data)
      // const spanId = 'span' + event.target.getAttribute('id');
      // const span = document.getElementById(spanId)
      // if (span) {
      // imagesList.removeChild(span)
      // }
    })

var token = "VOTRE_JETON";  
localStorage.setItem('accessToken', token);

const url = 'http://localhost:5678/api/works';

fetch(url, {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Erreur de suppression');
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => console.error('Erreur:', error));
  
}
})

init();