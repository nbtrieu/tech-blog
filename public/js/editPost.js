console.log('anything');

const postId = document.querySelector('input[name="post-id"]').value;

const editPostFormHandler = async (event) => {
  console.log('STARTING editPost.js for updating');
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('textarea[name="post-content"]').value.trim();

  // console.log('--------------');
  // console.log(postId);
  // console.log(`/api/post/${postId}`);
  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('post updated');
  document.location.replace('/dashboard');
};

const deleteClickHandler = async () => {
  console.log('STARTING editPost.js for deleting');

  await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
  });

  console.log('post deleted');
  document.location.replace('/dashboard');
  };

document.addEventListener('submit', editPostFormHandler);
document.addEventListener('reset', deleteClickHandler);