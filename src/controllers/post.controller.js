import PostService from '../services/post.service.js';
import UserService from '../services/user.service.js';
import CommentService from '../services/comment.service.js';

class PostController {
  static async create({ body, user }, res) {
    try {
      const postData = {
        ...body,
        authorId: user.id,
        authorName: user.name,
      };

      const newPost = await PostService.create(postData);

      return res.status(201).json({
        message: 'Post criado com sucesso!',
        newPost,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async findAll(_, res) {
    try {
      const posts = await PostService.getAllPosts();

      return res.status(200).render('posts', { posts });
      // return res.status(200).json({ posts, comments });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findAllByAuthorId({ params }, res) {
    try {
      const user = await UserService.getById(params.id);
      const posts = await PostService.getAllPostsByAuthorId(params.id);

      return res.status(200).render('posts-author', { user, posts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async findById({ params }, res) {
    try {
      const post = await PostService.getById(params.id);
      const comments = await CommentService.getByPostId(post.id);

      return res.status(200).render('post', { post, comments });
      // return res.status(200).json(post);
    } catch (error) {
      const statusCode = error.message.includes('Post não encontrado.')
        ? 404
        : 500;

      return res.status(statusCode).json({ message: error.message });
    }
  }

  static async update({ body, params }, res) {
    try {
      const updatedPost = await PostService.updatePost(params.id, body);

      return res.status(200).json(updatedPost);
    } catch (error) {
      const statusCode = error.message.includes('Post não encontrado.')
        ? 404
        : 500;

      return res.status(statusCode).json({ message: error.message });
    }
  }

  static async delete({ params }, res) {
    try {
      const deletedPost = await PostService.delete(params.id);

      return res.status(200).json({
        message: 'Post deletado com sucesso.',
        deletedPost: deletedPost,
      });
    } catch (error) {
      const statusCode = error.message.includes('Post não encontrado.')
        ? 404
        : 500;

      return res.status(statusCode).json({ message: error.message });
    }
  }
}

export default PostController;
