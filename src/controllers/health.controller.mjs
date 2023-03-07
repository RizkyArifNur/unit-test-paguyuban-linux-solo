import * as expres from "express";
const router = expres.Router();

router.get('/', (req, res)=> {
    res.sendStatus(200)
})

export const healthRouter = router