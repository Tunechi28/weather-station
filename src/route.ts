import { Request, Response, Router } from "express";
import weatherStationRoutes from "./app/Weather Station/weather-station-routes";
const routes = Router({ mergeParams: true });

routes.route("/").get((req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to Max drive" });
});

routes.use("/weather-station", weatherStationRoutes);

export default routes;
