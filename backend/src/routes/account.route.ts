import express from "express"

const accountRouter=express.Router();


accountRouter.post('/account/create',createAccount);
accountRouter.patch('/account/update',updateAccount);
accountRouter.delete('/account/delete',deleteAccount);

export default accountRouter;