import { Router } from 'express';
import multer from 'multer';

import { getRepository } from 'typeorm';
import PatientsController from '../app/controllers/PatientsController';
import Patients from '../app/models/Patients';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const patientsRouter = Router();

patientsRouter.get('/', async (request, response) => {
  const patientsController = getRepository(Patients);
  const patients = await patientsController.find();
  return response.json(patients);
});

patientsRouter.post('/', upload.single('picture'), async (request, response) => {
  try {
    const { name, email, telephone } = request.body;
    const picture = request.file.filename;

    const patientsController = new PatientsController();
    const patients = await patientsController.store({
      name,
      email,
      telephone,
      picture,
    });

    return response.json(patients);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

patientsRouter.get('/:id', async (request, response) => {
  try {
    const patientsController = getRepository(Patients);
    const { id } = request.params;
    const patients = await patientsController.findOne(id);

    return response.json(patients);
  } catch (erro) {
    return response.json('Patients not found.');
  }
});

patientsRouter.delete('/:id', async (request, response) => {
  try {
    const patientsController = getRepository(Patients);
    const { id } = request.params;

    await patientsController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Patients not found.');
  }
});

patientsRouter.patch(
  '/:id',
  upload.single('picture'),
  async (request, response) => {
    try {
      const id = request.params;
      const { name, email, telephone } = request.body;
      const picture = request.file.filename;

      const patientsController = new PatientsController();
      const patients = await patientsController.update({
        id,
        name,
        email,
        telephone,
        picture,
      });

      return response.json(patients);
    } catch (erro) {
      return response.json({ error: erro.message });
    }
  },
);

export default patientsRouter;
