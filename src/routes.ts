import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";

const router = Router()

router.post('/users', async (request, response) => {
  createUserController.handle(request, response)
})

export default router
