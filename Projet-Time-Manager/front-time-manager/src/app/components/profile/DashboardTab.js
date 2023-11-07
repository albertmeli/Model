import React from 'react';
import WorkingTimeChart from '../Chart';
import SetWorkingTime from './SetWorkingTime';
import ShowWorkingTime from './ShowWorkingTime';

const DashboardTab = () => {
    return (
        <div>
            <SetWorkingTime />
            <ShowWorkingTime />
            <WorkingTimeChart />
        </div>
    );
};

export default DashboardTab;