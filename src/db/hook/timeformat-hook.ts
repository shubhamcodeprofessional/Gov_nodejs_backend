import { Model } from 'sequelize';

export const beforeSave = (record: Model) => {
    record.set('created_on', Date.now());
    record.set('modified_on', Date.now());
};