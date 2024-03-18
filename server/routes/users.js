import express from 'express'
import { editProfile, getUsers, getUser } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* GET ALL USER */
router.get('/', getUsers);

/* GET SPECIFIC USERS */
router.get('/:id', getUser);

/* UPDATE USER PROFILE*/ 
router.patch('/profile/:id', editProfile);

export default router;