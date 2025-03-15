import sequelize from '../config/database.js';
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
  try {
    const events = await Event.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) 
              FROM "event_attendees" AS attendees 
              WHERE attendees."eventId" = "Event"."id"
            )`),
            'attendeeCount',
          ],
        ],
      },
    });
    return events;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEventByIdService = async (eventId) => {
  return await Event.findByPk(eventId);
};

export const updateEventService = async (eventId, eventData) => {
  const event = await Event.findByPk(eventId);
  if (!event) return null;

  // Check if event_url is missing in the update request
  if (!eventData.event_url) {
    throw new Error('Event image (event_url) must be updated!');
  }

  await event.update({
    ...eventData,
    keyhighlights: eventData.keyhighlights || event.keyhighlights,
    whoShouldAttend: eventData.whoShouldAttend || event.whoShouldAttend,
  });

  return event;
};

export const toggleEventStatusService = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (!event) return null;

  event.status = !event.status;
  await event.save();

  return event;
};
