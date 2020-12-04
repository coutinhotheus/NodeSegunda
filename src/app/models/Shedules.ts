import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Doctors from './Doctors';
import Patients from './Patients';

@Entity('shedules')
class Shedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_doctor: string;

  @ManyToOne(() => Doctors)
  @JoinColumn({ name: 'id_doctor' })
  doctors_id: Doctors;

  @Column()
  id_patient: string;

  @ManyToOne(() => Patients)
  @JoinColumn({ name: 'id_patient' })
  patients_id: Patients;

  @Column()
  date: string;

  @Column()
  hour: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Shedules;
