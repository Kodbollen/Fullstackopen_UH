import patientData from '../../data/patientData';
import {Patient, PatientNonSensitive, NewPatient} from '../types';
import {v4 as generateUUID} from 'uuid';

const getPatients = (): Array<Patient> => {
    return patientData;
};

const getPatientsNonSensitive = (): Array<PatientNonSensitive> => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: generateUUID(),
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatientsNonSensitive,
    addPatient
};
