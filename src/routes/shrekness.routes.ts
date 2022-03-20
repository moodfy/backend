import { Router } from "express";
import { ShreknessController } from "../controller/shreknessController";
import { ensureAuthenticated } from "../middleware/auth";

export class ShreknessRoute {

    public router: Router;
    private shrekCtrl: ShreknessController = new ShreknessController()


    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get('/', ensureAuthenticated, this.shrekCtrl.calculate)
        
        
    }
}