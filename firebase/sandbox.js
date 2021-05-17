<script src="https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js"></script>

var firebaseConfig = {
    apiKey: "AIzaSyAm3beJBWv7CdYYF3Llqn1UicBsYELhWBQ",
    authDomain: "mediawiki-7cdcc.firebaseapp.com",
    projectId: "mediawiki-7cdcc",
    storageBucket: "mediawiki-7cdcc.appspot.com",
    messagingSenderId: "671800151833",
    appId: "1:671800151833:web:b9c73e77028d9857c67f88"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
db.collection('recipes');

const list = document.querySelector('ul');
const form = document.querySelector('form');

const addRecipe = recipe => {
    let formattedTime = recipe.created_at.toDate();

    let diaData = formattedTime.getDate();
    diaData = (diaData<10) ? "0"+diaData : diaData;

    let mesData = formattedTime.getDate()+1;
    mesData = (mesData<10) ? "0"+mesData : mesData;

    let anyData = formattedTime.getFullYear();

    let html = `
        <li>
            <b>${recipe.title}</b>
            <div>${diaData + "/" 
            + mesData + "/"
            + anyData}</div>
            <button class="btn btn-danger btn-sm my-2">delete</button>
        </li>
    `;
    //console.log(html);
    list.innerHTML += html;
};

db.collection('recipes').get()
    .then(snapshot => {
        // console.log(snapshot.docs[0].data());
        snapshot.forEach(doc => {
            // console.log(doc.data());
            addRecipe(doc.data());
        });
    })
    .catch(err => console.log(err));

// add documents
form.addEventListener('submit', e => {
    e.preventDefault();
    let now = new Date();
    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    db.collection('recipes').add(recipe)
    .then(() => console.log('recipe added!'))
    .catch(err => console.log(err))
});


