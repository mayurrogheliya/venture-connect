import { uploadSingleFile } from '../services/fileUpload.service.js';
import * as EventService from '../services/event.service.js';
import { errorResponse, successResponse } from '../utils/responseFormatter.js';
import { deleteImageFromCloudinary } from '../services/cloudinary.service.js';

export const createEvent = async (req, res) => {
  try {
    const uploadedImage = req.file ? await uploadSingleFile(req.file) : null;
    const eventData = {
      ...req.body,
      event_url: uploadedImage ? uploadedImage.url : null,
      keyhighlights: req.body.keyhighlights
        ? JSON.parse(req.body.keyhighlights)
        : [],
      whoShouldAttend: req.body.whoShouldAttend
        ? JSON.parse(req.body.whoShouldAttend)
        : [],
    };

    const event = await EventService.createEventService(eventData);
    return successResponse(res, event, 'Event created successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEventsService();
    return successResponse(res, events, 'Events retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await EventService.getEventByIdService(req.params.id);
    if (!event) return errorResponse(res, 'Event not found', 404);
    return successResponse(res, event, 'Event retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await EventService.getEventByIdService(req.params.id);
    if (!event) return errorResponse(res, 'Event not found', 404);

    if (req.file) {
      await deleteImageFromCloudinary(event.event_url);
      const uploadedImage = await uploadSingleFile(req.file);
      req.body.event_url = uploadedImage.url;
    }

    req.body.keyhighlights = req.body.keyhighlights
      ? JSON.parse(req.body.keyhighlights)
      : event.keyhighlights;
    req.body.whoShouldAttend = req.body.whoShouldAttend
      ? JSON.parse(req.body.whoShouldAttend)
      : event.whoShouldAttend;

    const updatedEvent = await EventService.updateEventService(
      req.params.id,
      req.body,
    );
    return successResponse(res, updatedEvent, 'Event updated successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await EventService.getEventByIdService(req.params.id);
    if (!event) return errorResponse(res, 'Event not found', 404);

    await deleteImageFromCloudinary(event.event_url);
    await EventService.deleteEventService(req.params.id);
    return successResponse(res, null, 'Event deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
