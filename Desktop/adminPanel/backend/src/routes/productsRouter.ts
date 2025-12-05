import { Router} from 'express'
import type { Request, Response } from 'express';
const router = Router()
import {getAllProducts }from '../controllers/productsControllers'

router.get('/',(req: Request, res: Response) => getAllProducts(req, res))

export default router 