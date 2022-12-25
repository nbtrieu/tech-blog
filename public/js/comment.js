console.log('anything');

const postId = document.querySelector('input[name="post-id"]').value;
const content = document.querySelector('textarea[name="comment-input"]').value;

const commentFormHandler = async (event) => {
  console.log('STARTING comment.js');
  event.preventDefault();

  const postId = document.querySelector('input[name="post-id"]').value;
  const content = document.querySelector('textarea[name="comment-input"]').value;
  
  if (content) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ postId, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('comment submitted');
    document.location.reload();
  }
};

document.addEventListener('submit', commentFormHandler);