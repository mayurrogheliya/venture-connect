import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Event from './event.model.js';

class EventAttend extends Model {}

EventAttend.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Event, key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'EventAttend',
    tableName: 'event_attendees',
    timestamps: true,
  },
);

Event.hasMany(EventAttend, { foreignKey: 'eventId' });
EventAttend.belongsTo(Event, { foreignKey: 'eventId' });

export default EventAttend;
