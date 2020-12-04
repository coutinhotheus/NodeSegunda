import { getRepository } from 'typeorm';

import Doctors from '../models/Doctors';

interface Request {
  name: string;
  specialty: string;
}

interface Update {
  id: string;
  name?: string;
  specialty?: string;
}

class DoctorsController {
  public async store({ name, specialty }: Request): Promise<Doctors> {
    const DoctorsRepository = getRepository(Doctors);

    const doctor = DoctorsRepository.create({
      name,
      specialty,
    });

    await DoctorsRepository.save(doctor);
    return doctor;
  }

  public async update({ id, name, specialty }: Update): Promise<Doctors> {
    const DoctorsRepository = getRepository(Doctors);

    const doctor = await DoctorsRepository.findOne(id);

    if (!doctor) {
      throw new Error('doctor not found');
    }

    if (name) {
      doctor.name = name;
    }

    if (specialty) {
      doctor.specialty = specialty;
    }

    await DoctorsRepository.save(doctor);
    return doctor;
  }
}

export default DoctorsController;
