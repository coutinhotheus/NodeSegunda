import { getRepository } from 'typeorm';

import Shedules from '../models/Shedules';
import Doctors from '../models/Doctors';
import Patients from '../models/Patients';

interface Request {
  id_doctor: string;
  id_patient: string;
  date: string;
  hour: string;
}

interface Update {
  id: string;
  id_doctor?: string;
  id_patient?: string;
  date?: string;
  hour?: string;
}

class ShedulesController {
  public async store({
    id_doctor,
    id_patient,
    date,
    hour,
  }: Request): Promise<Shedules> {
    const ShedulesRepository = getRepository(Shedules);
    const DoctorsRepository = getRepository(Doctors);
    const PatientRepository = getRepository(Patients);

    const checkDoctor = await DoctorsRepository.findOne(id_doctor);

    if (!checkDoctor) {
      throw new Error('Doctor not found');
    }

    const checkPatient = await PatientRepository.findOne(id_patient);

    if (!checkPatient) {
      throw new Error('Patient not found');
    }

    const shedule = ShedulesRepository.create({
      id_doctor,
      id_patient,
      date,
      hour,
    });

    await ShedulesRepository.save(shedule);
    return shedule;
  }

  public async update({
    id,
    id_doctor,
    id_patient,
    date,
  }: Update): Promise<Shedules> {
    const ShedulesRepository = getRepository(Shedules);

    const shedules = await ShedulesRepository.findOne(id);

    if (!shedules) {
      throw new Error('Shedules not found');
    }

    if (id_doctor) {
      shedules.id_doctor = id_doctor;
    }

    if (id_patient) {
      shedules.id_patient = id_patient;
    }

    if (date) {
      shedules.date = date;
    }

    await ShedulesRepository.save(shedules);
    return shedules;
  }
}

export default ShedulesController;
