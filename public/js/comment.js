console.log('anything');

const commentFormHandler = async (event) => {
  console.log('STARTING comment.js');
  event.preventDefault();

  const postId = document.querySelector('input[name="post-id"]').value;
  const content = document.querySelector('textarea[name="comment-input"]').value;
  
  // *BUG: WHY IS IT GIVING 500 ERROR WITH THE FETCH REQUEST WHEN THE DATA DOES UPDATE IN MYSQL??
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