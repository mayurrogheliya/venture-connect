import sequelize from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Event extends Model {
  getKeyHighlights() {
    return this.keyHighlights ? this.keyhighlights.split('\n') : [];
  }

  setKeyHighlights(highlightsArray) {
    this.keyhighlights = highlightsArray.join('\n');
  }

  getWhoShouldAttend() {
    return this.whoShouldAttend ? this.whoShouldAttend.split('\n') : [];
  }
  setWhoShouldAttend(WhoShouldAttendArray) {
    this.whoShouldAttend = WhoShouldAttendArray.join('\n');
  }
}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    keyhighlights: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    whoShouldAttend: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeFrom: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    timeTill: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    event_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'event',
    modelName: 'Event',
    timestamps: true,
  },
);
export default Event;
