import Event from '../models/event.model.js';
import eventValidationSchema from '../validation/eventValidation.js';

export const createEventService = async (eventData) => {
  await eventValidationSchema.validate(eventData, { abortEarly: false });

  return await Event.create({
    ...eventData,
    keyhighlights: eventData.keyhighlights || [],
    whoShouldAttend: eventData.whoShouldAttend || [],
  });
};

export const getAllEventsService = async () => {
  return await Event.findAll();
};

export const getEventByIdService = async (eventId) => {
  return await Event.findByPk(eventId);
};

export const updateEventService = async (eventId, eventData) => {
  const event = await Event.findByPk(eventId);
  if (!event) return null;

  await event.update({
    ...eventData,
    keyhighlights: eventData.keyhighlights || event.keyhighlights,
    whoShouldAttend: eventData.whoShouldAttend || event.whoShouldAttend,
  });

  return event;
};

export const deleteEventService = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (!event) return null;

  await event.destroy();
  return event;
};
