class CommentResponseDTO {
  constructor(comment) {
    if (!comment) {
      throw new Error(
        "O objeto 'comment' não pode ser nulo para o CommentResponseDTO",
      );
    }

    this.name = comment.name;
    this.userId = comment.userId;
    this.postId = comment.postId;
    this.text = comment.text;
    this.createdAt = comment.createdAt;
  }
}

export default CommentResponseDTO;
