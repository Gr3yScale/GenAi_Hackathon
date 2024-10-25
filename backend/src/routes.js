import express from "express"
const router = express.Router()
import controller from "./controller.js"

router.get('/', controller.helloWorld);
router.get('/ping', controller.ping);

export default router