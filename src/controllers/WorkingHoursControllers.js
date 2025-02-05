import { driverScheduleModel } from '../models/WorkingHoursModels.js';

export const getDays = async (req, res) => {
    try {
        const days = await driverScheduleModel.getDaysModel();
        res.json(days);
    } catch (error) {
        console.error('Error fetching days:', error);
        res.status(500).json({ message: 'Error fetching days' });
    }
};

export const getSchedules = async (req, res) => {
    try {
        const schedules = await driverScheduleModel.getSchedulesModel();
        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ message: 'Error fetching schedules' });
    }
};



export const getDriverSchedules = async (req, res) => {
    try {
        const schedules = await driverScheduleModel.getDriverSchedulesModel();
        res.json(schedules);
    } catch (error) {
        console.error('Error fetching driver schedules:', error);
        res.status(500).json({ message: 'Error fetching driver schedules' });
    }
};

export const getDriverSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await driverScheduleModel.getDriverScheduleModel(id);
        if (schedule.length === 0) {
            return res.status(404).json({ message: 'Driver schedule not found' });
        }
        res.json(schedule);
    } catch (error) {
        console.error('Error fetching driver schedule:', error);
        res.status(500).json({ message: 'Error fetching driver schedule' });
    }
};

export const createDriverSchedule = async (req, res) => {
    const { id, entry_time, exit_time, day_id, driver_id } = req.body;
    try {
        const newSchedule = await driverScheduleModel.createDriverScheduleModel({ id, entry_time, exit_time, day_id, driver_id });
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error creating driver schedule:', error);
        res.status(500).json({ message: 'Error creating driver schedule' });
    }
};

export const updateDriverSchedule = async (req, res) => {
    const { id } = req.params;
    const { entry_time, exit_time, day_id, driver_id, schedule_id } = req.body;
    try {
        const updatedSchedule = await driverScheduleModel.updateDriverScheduleModel(id, { entry_time, exit_time, day_id, driver_id, schedule_id });
        if (updatedSchedule.length === 0) {
            return res.status(404).json({ message: 'Driver schedule not found' });
        }
        res.json(updatedSchedule);
    } catch (error) {
        console.error('Error updating driver schedule:', error);
        res.status(500).json({ message: 'Error updating driver schedule' });
    }
};

export const deleteDriverSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSchedule = await driverScheduleModel.deleteDriverScheduleModel(id);
        if (deletedSchedule.length === 0) {
            return res.status(404).json({ message: 'Driver schedule not found' });
        }
        res.json({ message: 'Driver schedule deleted successfully' });
    } catch (error) {
        console.error('Error deleting driver schedule:', error);
        res.status(500).json({ message: 'Error deleting driver schedule' });
    }
};