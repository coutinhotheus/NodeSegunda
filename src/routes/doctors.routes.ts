import { Router } from 'express';

import { getRepository } from 'typeorm';
import DoctorsController from '../app/controllers/DoctorsController';

import Doctors from '../app/models/Doctors';

const doctorsRouter = Router();

doctorsRouter.get('/', async (request, response) => {
  const doctorsController = getRepository(Doctors);
  const doctors = await doctorsController.find();
  return response.json(doctors);
});

doctorsRouter.post('/', async (request, response) => {
  try {
    const { name, specialty } = request.body;

    const doctorsController = new DoctorsController();
    const doctors = await doctorsController.store({
      name,
      specialty,
    });

    return response.json(doctors);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

doctorsRouter.get('/:id', async (request, response) => {
  try {
    const doctorsController = getRepository(Doctors);
    const { id } = request.params;
    const doctors = await doctorsController.findOne(id);

    return response.json(doctors);
  } catch (erro) {
    return response.json('Doctor not found.');
  }
});

doctorsRouter.delete('/:id', async (request, response) => {
  try {
    const doctorsController = getRepository(Doctors);
    const { id } = request.params;

    await doctorsController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Doctor not found.');
  }
});

doctorsRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const { 
      name,
      specialty
    } = request.body;

    const doctorsController = new DoctorsController();
    const doctors = await doctorsController.update({
      id,
      name,
      specialty,
    });

    return response.json(doctors);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default doctorsRouter;
