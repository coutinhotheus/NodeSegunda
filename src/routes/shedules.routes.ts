import { Router } from 'express';

import { getRepository } from 'typeorm';
import ShedulesController from '../app/controllers/ShedulesController';
import Doctors from '../app/models/Doctors';
import Patients from '../app/models/Patients';

import Shedules from '../app/models/Shedules';

const shedulesRouter = Router();

shedulesRouter.get('/', async (request, response) => {
  const shedulesController = getRepository(Shedules);
  const doctorController = getRepository(Doctors);
  const patientsController = getRepository(Patients);

  let shedulesComplet = []
  const shedules = await shedulesController.find();

  for (let i in shedules) {
    const doctor = await doctorController.findOne(shedules[i].id_doctor);
    const patients = await patientsController.findOne(shedules[i].id_patient);
  
    if (doctor && patients) {
    let shedulesComplete = {
      idConsulta: shedules[i].id,
      nomePaciente: patients.name,
      telephonePaciente: patients.telephone,
      PicturePaciente: patients.picture,
      doctorName: doctor.name,
      especialidadeMedico: doctor.specialty,
      dataConsulta: shedules[i].date,
      horaConsulta: shedules[i].hour,
      } 

      shedulesComplet.push(shedulesComplete)
    }

    console.log(shedulesComplet)

    return response.json(shedulesComplet);
  }
});

shedulesRouter.post('/', async (request, response) => {
  try {
    const { id_doctor, id_patient, date, hour } = request.body;

    const shedulesController = new ShedulesController();
    const shedules = await shedulesController.store({
      id_doctor,
      id_patient,
      date,
      hour,
    });

    return response.json(shedules);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

shedulesRouter.get('/:id', async (request, response) => {
  try {
    const shedulesController = getRepository(Shedules);
    const doctorController = getRepository(Doctors);
    const patientsController = getRepository(Patients);

    let patients = {}
    let doctor = {}
    let listID = {}

    const { id } = request.params;
    const shedules = await shedulesController.findOne(id);

    if (shedules) {
    const checkDoctor = await doctorController.findOne(shedules.doctors_id);
    if (checkDoctor) {
      doctor = checkDoctor
    }
  }

    if (shedules) {
      const checkPatients = await doctorController.findOne(shedules.patients_id);
      if (checkPatients) {
        patients = checkPatients
      }
  }

    if (patients && doctor && shedules) {
      listID = {
        idConsulta: shedules.id,
        nomePaciente: patients.name,
        telephonePaciente: patients.telephone,
        PicturePaciente: patients.picture,
        doctorName: doctor.name,
        especialidadeMedico: doctor.specialty,
        dataConsulta: shedules.date,
        horaConsulta: shedules.hour,
        }
    }

    return response.json(listID);
  } catch (erro) {
    return response.json('Shedule not found.');
  }
});

shedulesRouter.delete('/:id', async (request, response) => {
  try {
    const shedulesController = getRepository(Shedules);

    const { id } = request.params;

    await shedulesController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Shedule not found.');
  }
});

shedulesRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const { id_doctor, id_patient, date, hour } = request.body;

    const shedulesController = new ShedulesController();
    const shedules = await shedulesController.store({
      id_doctor,
      id_patient,
      date,
      hour,
    });

    return response.json(shedules);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default shedulesRouter;
