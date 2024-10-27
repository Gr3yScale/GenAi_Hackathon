import express from "express"
const router = express.Router()
import controller from "./controller.js"

router.get('/', controller.helloWorld);
router.get('/ping', controller.ping);
//untill backend is up
router.get('/dummy/csid/:csid', controller.dummyData);

export default router