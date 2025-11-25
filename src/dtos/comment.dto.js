class CommentResponseDTO {
  constructor(comment) {
    if (!comment) {
      throw new Error(
        "O objeto 'comment' não pode ser nulo para o CommentResponseDTO"
      );
    }

    this.userId = comment.userId;
    this.content = comment.content;
    this.postId = comment.postId;
  }
}

export default CommentResponseDTO;
