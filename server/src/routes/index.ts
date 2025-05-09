import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import studentRouter from "./student.routes";

const router = Router()

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/user", userRouter
    /*
        #swagger.tags = ['Users']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)

router.use("/students", studentRouter
    /*
        #swagger.tags = ['Students']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)

export default router