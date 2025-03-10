import {
  registerForEventService,
  getAllAttendeesService,
  getAttendeeByIdService,
  updateAttendeeService,
  deleteAttendeeService,
} from '../services/eventAttend.service.js';
import {
  successResponse,
  errorResponse,
} from '../../utils/responseFormatter.js';

export const registerForEvent = async (req, res) => {
  try {
    const attendee = await registerForEventService(req.body);
    return successResponse(res, attendee, 'Registered successfully');
  } catch (error) {
    return errorResponse(res, error.errors || error.message);
  }
};

export const getAllAttendees = async (req, res) => {
  try {
    const attendees = await getAllAttendeesService();
    return successResponse(res, attendees, 'Attendees retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAttendeeById = async (req, res) => {
  try {
    const attendee = await getAttendeeByIdService(req.params.id);
    if (!attendee) return errorResponse(res, 'Attendee not found', 404);
    return successResponse(res, attendee, 'Attendee retrieved successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateAttendee = async (req, res) => {
  try {
    const attendee = await updateAttendeeService(req.params.id, req.body);
    if (!attendee) return errorResponse(res, 'Attendee not found', 404);
    return successResponse(res, attendee, 'Attendee updated successfully');
  } catch (error) {
    return errorResponse(res, error.errors || error.message);
  }
};

export const deleteAttendee = async (req, res) => {
  try {
    const deleted = await deleteAttendeeService(req.params.id);
    if (!deleted) return errorResponse(res, 'Attendee not found', 404);

    return successResponse(
      res,
      null,
      'Attendee status updated to inactive successfully',
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
