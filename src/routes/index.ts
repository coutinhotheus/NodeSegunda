import { Router } from 'express';

import doctorsRouter from './doctors.routes';
import patientsRouter from './patients.routes';
import shedulesRouter from './shedules.routes';

const routes = Router();

routes.use('/doctors', doctorsRouter);
routes.use('/patients', patientsRouter);
routes.use('/shedules', shedulesRouter);

export default routes;
