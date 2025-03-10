import EventAttend from '../models/eventAttend.model.js';
import eventAttendValidationSchema from '../validation/eventAttendValidation.js';

export const registerForEventService = async (attendeeData) => {
  await eventAttendValidationSchema.validate(attendeeData, {
    abortEarly: false,
  });
  return await EventAttend.create(attendeeData);
};

export const getAllAttendeesService = async () => {
  return await EventAttend.findAll({
    where: { status: true },
    include: 'Event',
  });
};

export const getAttendeeByIdService = async (attendeeId) => {
  return await EventAttend.findOne({
    where: { id: attendeeId, status: true },
    include: 'Event',
  });
};

export const updateAttendeeService = async (attendeeId, attendeeData) => {
  await eventAttendValidationSchema.validate(attendeeData, {
    abortEarly: false,
  });

  const attendee = await EventAttend.findByPk(attendeeId);
  if (!attendee) return null;

  await attendee.update(attendeeData);
  return attendee;
};

export const deleteAttendeeService = async (attendeeId) => {
  const attendee = await EventAttend.findOne({
    where: { id: attendeeId, status: true },
  });

  if (!attendee) return null;

  await attendee.update({ status: false });

  return true;
};
