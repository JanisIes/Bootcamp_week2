import Logger from '../utils/logger';
import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import AppError from '../errors/AppError';

const logger = Logger('mediaController');

const addPost = async (req, res) => {
  logger.log('debug', `addPost: ${JSON.stringify(req.boby)}`);
  const { user } = req;
  const { caption, contentId } = req.body;
  const media = await MediaModel.getMediaById(contentId);
  if (!media) {
    throw new AppError('No media with such ID!', 400);
  }
  const { path } = await MediaModel.getMediaById(contentId);
  const post = await PostModel.save({
    caption,
    username: user.username,
    media: {
      path,
      contentId,
    },
  });
  // TODO save post model to DB
  res.status(200).send({ payload: { post } });
};

const uploadImage = async (req, res) => {
  logger.log('debug', 'Upload image!');
  const { user } = req;
  const {
    file: { filename },
  } = req;
  const path = `/${process.env.UPLOAD_FOLDER}/${filename}`;
  const media = await MediaModel.save({
    username: user.username,
    path,
  });
  res.status(200).send({
    payload: {
      contentId: media.id,
      path,
    },
  });
};

const getAllPosts = async (req, res) => {
  logger.log('debug', `getAllPosts`);
  const posts = await PostModel.getAllPosts();
  res.status(200).send({ payload: posts });
};

const getPostById = async (req, res) => {
  logger.log('debug', `getPostById ${JSON.stringify(req.params)}`);
  const post = await PostModel.getPostsById(req.params.id);
  res.status(200).send({ payload: post });
};

export { uploadImage, addPost, getAllPosts, getPostById };
