console.log('anything');

const commentFormHandler = async (event) => {
  console.log('STARTING comment.js');
  event.preventDefault();

  const post_id = document.querySelector('input[name="post-id"]').value;
  const content = document.querySelector('textarea[name="comment-input"]').value;
  console.log(post_id);
  console.log(content);
  console.log(JSON.stringify({ post_id, content }));
  
  if (content) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ post_id, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    await console.log('comment submitted');
    document.location.reload();
  }
};

document.addEventListener('submit', commentFormHandler);