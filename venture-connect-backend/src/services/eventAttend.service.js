import EventAttend from '../models/eventAttend.model.js';
import { sendRegistrationEmail } from '../utils/sendRegistrationEmail.js';
import eventAttendValidationSchema from '../validation/eventAttendValidation.js';
import Event from '../models/event.model.js';

export const registerForEventService = async (attendeeData) => {
  await eventAttendValidationSchema.validate(attendeeData, {
    abortEarly: false,
  });

  const newAttendee = await EventAttend.create(attendeeData);

  const eventDetails = await Event.findByPk(attendeeData.eventId);

  if (!eventDetails) {
    throw new Error('Event not found');
  }

  await sendRegistrationEmail(attendeeData.email, eventDetails, newAttendee);

  return newAttendee;
};

export const getAllAttendeesService = async (eventId) => {
  return await EventAttend.findAll({
    where: { eventId, status: true },
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
