class PostResponseDTO {
  constructor(post) {
    if (!post) {
      throw new Error(
        "O objeto 'post' não pode ser nulo para o PostResponseDTO.",
      );
    }

    this.id = post._id;
    this.title = post.title;
    this.content = post.content;
    this.thumbnail = post.thumbnail;
    this.tags = post.tags;
    this.authorId = post.authorId;
    this.authorName = post.authorName;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}

export default PostResponseDTO;
