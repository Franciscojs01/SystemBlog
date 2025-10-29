class PostResponseDTO {
  constructor(post) {
    if (!post) {
      throw new Error(
        "O objeto 'post' não pode ser nulo para o PostResponseDTO.",
      );
    }

    this.id = post._id ? post._id.toString() : null;
    this.author = post.author;
    this.title = post.title;
    this.content = post.content;
  }
}

export default PostResponseDTO;
