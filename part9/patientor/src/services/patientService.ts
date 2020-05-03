import patientData from '../../data/patientData';
import {Patient, PatientNonSensitive} from '../types';

const getPatients = (): Array<Patient> => {
    return patientData;
};

const getPatientsNonSensitive = (): Array<PatientNonSensitive> => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export default {
    getPatients,
    getPatientsNonSensitive
};
