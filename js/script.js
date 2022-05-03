const container = document.getElementById('container');

//creare un post per ogni oggetto
posts.forEach(element => {
  createPost(element);
});

function createPost(element){
  //creare il contenitore del post
  const post = document.createElement('div');
  post.classList.add('post');

  //creare l'header
  const header = createHeader(element);
  post.appendChild(header);

  //creare il testo del post
  const postText = createTextPost(element);
  post.appendChild(postText);

  //creare l'immagine del post
  const postImage = createPostImage(element);
  post.appendChild(postImage);

  //creare il footer del post
  const postFooter = createFooterPost(element);
  post.appendChild(postFooter);

  container.appendChild(post);
}

function createHeader(element){
  const header = document.createElement('div');
  header.classList.add('post__header');

  const index = posts.indexOf(element);
  const {author, created} = posts[index];
  // console.log(author);
  let {name, image} = author
  let profilePic = `<img class="profile-pic" src="${author.image}" alt="${author.name}"> `;

  //creare un'immagine alternativa se non c'è immagine del profilo
  if(author.image === ''){
    const initials = getAuthorInitials(author.name);

    profilePic = `
    <div class="profile-pic-default">
      <span>
      ${initials}
      </span>
    </div>`
  }

  
  const formattedDate = dateFormat(created);
  const headerContent = `
    <div class="post-meta">                    
        <div class="post-meta__icon">
          ${profilePic}
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${author.name}</div>
            <div class="post-meta__time">${formattedDate}</div>
        </div>                    
    </div>
  `;
  header.innerHTML = headerContent;

  return header;
}

function getAuthorInitials(name){
  // ricavare le parole che compongono i nomi dell'autore
  const nameWords = name.split(' ');
  
  //prendere le iniziali dei primi due nomi
  const initials = nameWords[0].charAt(0) + nameWords[1].charAt(0);
  return initials;
}

function dateFormat(dateElement){
  const day = dateElement.slice(3, 5);
  const month = dateElement.slice(0, 2);
  const year = dateElement.slice(6);
  // console.log(day, month, year);

  const formattedDate = `${day}-${month}-${year}`;
  // console.log(formattedDate);

  return formattedDate;
}

function createTextPost(element){
  const postText = document.createElement('div');
  postText.classList.add('post__text');

  const index = posts.indexOf(element);
  const {content} = posts[index];

  postText.innerText = content;

  return postText;
}

function createPostImage(element){
  const postImage = document.createElement('div');
  postImage.classList.add('post__image');

  const index = posts.indexOf(element);
  const {media} = posts[index];

  const image = `<img src="${media}" alt="">`;
  postImage.innerHTML = image;

  return postImage;
}

function createFooterPost(element){
  const footerPost = document.createElement('div');
  footerPost.classList.add('post__footer');

  const index = posts.indexOf(element);
  const {id, likes} = posts[index];

  footerPost.innerHTML = `
    <div class="likes js-likes">
      <div class="likes__cta">
          <a class="like-button  js-like-button" href="#" data-postid="${id}">
              <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
              <span class="like-button__label">Mi Piace</span>
          </a>
      </div>
      <div class="likes__counter">
          Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
      </div>
  </div>
  `;

  return footerPost;
}

// funzionalità del bottone like 
const likeBtns = document.querySelectorAll('.like-button');
const likeDisplays = document.querySelectorAll('.js-likes-counter');

likeBtns.forEach( element => {
  element.addEventListener('click', likebtnClick);
});

function likebtnClick(){
  //recuperare il likeDisplay e numero di like corrispondenti
  const elementIndex = parseInt(this.getAttribute('data-postid')) - 1;
  const currentLikeDisplay = likeDisplays[elementIndex];
  
  let {likes} = posts[elementIndex];

  if(this.classList.contains('like-button--liked')){
    //togliere like
    removeLike(this, likes, currentLikeDisplay);
    //aggiornare il numero di like nell'array
    posts[elementIndex].likes--;
  }else{
    //mettere like
    addLike(this, likes, currentLikeDisplay);
    //aggiornare il numero di like nell'array
    posts[elementIndex].likes++;
  }

  

  // console.log(likes);
}

function addLike(currentElement, number, display){
  currentElement.classList.add('like-button--liked');
  
  number++;
  display.innerText = number;
}

function removeLike(currentElement, number, display){
  currentElement.classList.remove('like-button--liked');
  
  number--;
  display.innerText = number;
}