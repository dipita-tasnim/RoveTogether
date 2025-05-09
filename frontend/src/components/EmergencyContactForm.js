import React, { useState } from 'react';
import axios from 'axios';

const EmergencyContactForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/sos/emergency-contact/${userId}`, formData);
            alert('Emergency contact updated successfully!');
        } catch (error) {
            console.error('Error updating emergency contact:', error);
            alert('Error updating emergency contact. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Contact Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Save Emergency Contact
            </button>
        </form>
    );
};

export default EmergencyContactForm;