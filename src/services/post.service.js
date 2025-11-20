import PostRepository from '../repositories/post.repository.js';
import PostResponseDTO from '../dtos/post.dto.js';

class PostService {
  static async create(postData) {
    const newPost = await PostRepository.create(postData);

    return new PostResponseDTO(newPost);
  }

  static async getAllPosts() {
    return await PostRepository.findAll();
  }

  static async getById(id) {
    const post = await PostRepository.findById(id);

    if (!post) {
      throw new Error('Post não encontrado.');
    }

    return new PostResponseDTO(post);
  }

  static async updatePost(id, postData) {
    const updatedPost = await PostRepository.update(id, postData);

    if (!updatedPost) {
      throw new Error('Post não encontrado para atualização.');
    }

    return new PostResponseDTO(updatedPost);
  }

  static async delete(id) {
    const deletedPost = await PostRepository.delete(id);

    if (!deletedPost) {
      throw new Error('Post não encontrado para exclusão.');
    }

    return deletedPost;
  }
}

export default PostService;
