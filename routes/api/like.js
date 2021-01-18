const express = require('express')
const router = express.Router();
const Post = require('../../models/post')
const MSGS = require('../../messages')
const auth = require('../../middleware/auth')


// @route    POST /like
// @desc     add like
// @access   Private
router.post('/:id', auth ,async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, 
            { $addToSet: { likes: req.user.id } }, { new: true })
        if (post) {
          res.json(post);
        }else {
            res.status(404).send({ "error": "post not found" })
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})

// @route    DELETE /like
// @desc     delete like
// @access   Private
router.delete('/:id', auth ,async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, 
            { $pull: { likes: req.user.id } }, { new: true })
        if (post) {
          res.json(post);
        }else {
            res.status(404).send({ "error": "post not found" })
        }
    } catch (err) {
      res.status(500).send({ "error": err.message })
    }
})


module.exports = router;