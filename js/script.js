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
  console.log(author);

  const headerContent = `
    <div class="post-meta">                    
        <div class="post-meta__icon">
            <img class="profile-pic" src="${author.image}" alt="${author.name}">                    
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${author.name}</div>
            <div class="post-meta__time">${created}</div>
        </div>                    
    </div>
  `;
  header.innerHTML = headerContent;

  return header;
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