import { Router } from "express";
import * as weatherStationController from "./weather-station-controller";
import { ApiQueryParams } from "./weather-station-interface";

const router = Router();

router.get("/report", async(req, res) => {
    const data = await weatherStationController.weatherStation(req.query as unknown as ApiQueryParams)
    res.send(data)
})


export default router;
