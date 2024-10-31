import React, { useState } from 'react';

function DateTimePicker({ register, name, errors }) {
    const [hour, setHour] = useState(9);  // Default hour set to 9
    const [minute, setMinute] = useState(36);  // Default minute set to 36
    const [period, setPeriod] = useState('AM');  // Default period set to AM

    const hours = Array.from({ length: 12 }, (_, i) => i + 1); // Hours from 1 to 12
    const minutes = Array.from({ length: 60 }, (_, i) => i); // Minutes from 0 to 59

    return (
        <div className="flex flex-col items-center bg-white text-secondary p-4">
            <div className="flex justify-between w-full border border-secondary">
                <select
                    className="bg-transparent text-2xl"
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    {...register(`${name}.hour`, { required: 'Hour is required' })}
                >
                    {hours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>
                <select
                    className="bg-transparent text-2xl"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    {...register(`${name}.minute`, { required: 'Minute is required' })}
                >
                    {minutes.map((m) => (
                        <option key={m} value={m}>{m < 10 ? `0${m}` : m}</option>
                    ))}
                </select>
                <select
                    className="bg-transparent text-2xl"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    {...register(`${name}.period`, { required: 'Period is required' })}
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            {errors && (
                <div className="text-red-600">
                    {errors.hour && <p>{errors.hour.message}</p>}
                    {errors.minute && <p>{errors.minute.message}</p>}
                    {errors.period && <p>{errors.period.message}</p>}
                </div>
            )}
        </div>
    );
}

export default DateTimePicker;
