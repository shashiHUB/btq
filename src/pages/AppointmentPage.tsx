import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const services = {
  beauty: [
    { id: 'facial', name: 'Facial Treatment', duration: '60 min', price: '$50' },
    { id: 'hair', name: 'Hair Styling', duration: '45 min', price: '$40' },
    { id: 'makeup', name: 'Makeup', duration: '60 min', price: '$60' },
    { id: 'mani-pedi', name: 'Manicure & Pedicure', duration: '60 min', price: '$45' }
  ],
  tailoring: [
    { id: 'custom-dress', name: 'Custom Dress', duration: '5-7 days', price: 'from $150' },
    { id: 'alterations', name: 'Alterations', duration: '2-3 days', price: 'from $30' },
    { id: 'bridal', name: 'Bridal Wear', duration: '14-21 days', price: 'from $500' },
    { id: 'formal', name: 'Formal Wear', duration: '7-10 days', price: 'from $200' }
  ]
};

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM'
];

export function AppointmentPage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('beauty');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 30 days from now as the maximum selectable date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getServiceName = () => {
    const service = services[selectedCategory].find(s => s.id === selectedService);
    return service ? service.name : '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedService && selectedDate && selectedTime && customerName) {
      const message = encodeURIComponent(
        `Booking Confirmation\n` +
        `Service: ${getServiceName()}\n` +
        `Date: ${formatDate(selectedDate)}\n` +
        `Time: ${selectedTime}\n` +
        `Name: ${customerName}\n` +
        `Notes: ${notes || 'None'}\n\n` +
        `Please confirm my appointment. Thank you!`
      );

      window.location.href = `https://wa.me/919148717456?text=${message}`;
    }
  };

  return (
    <div className="min-h-screen bg-secondary pt-20 pb-12">
      <div className="container max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="bg-secondary-light p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-serif font-bold text-primary mb-8">Book an Appointment</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Customer Information */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white">Your Information</label>
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 bg-secondary border-2 border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                required
              />
            </div>

            {/* Service Category Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white mb-4">Select Category</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-colors ${
                    selectedCategory === 'beauty'
                      ? 'border-primary text-primary'
                      : 'border-gray-700 text-gray-400 hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setSelectedCategory('beauty');
                    setSelectedService('');
                  }}
                >
                  Beauty Services
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-colors ${
                    selectedCategory === 'tailoring'
                      ? 'border-primary text-primary'
                      : 'border-gray-700 text-gray-400 hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setSelectedCategory('tailoring');
                    setSelectedService('');
                  }}
                >
                  Tailoring Services
                </button>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white">Select Service</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services[selectedCategory].map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedService === service.id
                        ? 'border-primary text-primary'
                        : 'border-gray-700 text-gray-400 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <h3 className="font-medium mb-1">{service.name}</h3>
                    <div className="flex justify-between text-sm">
                      <span>{service.duration}</span>
                      <span>{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
              <label htmlFor="date" className="block text-lg font-medium text-white">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-primary" />
                  Select Date
                </div>
              </label>
              <input
                type="date"
                id="date"
                min={minDate}
                max={maxDateStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 bg-secondary border-2 border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                required
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-primary" />
                  Select Time
                </div>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                      selectedTime === time
                        ? 'border-primary text-primary'
                        : 'border-gray-700 text-gray-400 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white">Additional Notes</label>
              <textarea
                rows={4}
                placeholder="Any special requests or requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 bg-secondary border-2 border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full btn btn-primary py-4 ${
                !(selectedService && selectedDate && selectedTime && customerName)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              disabled={!(selectedService && selectedDate && selectedTime && customerName)}
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}