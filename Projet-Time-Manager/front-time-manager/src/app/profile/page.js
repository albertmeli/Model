"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import SubNav from '../components/profile/SubNav';
import DashboardTab from '../components/profile/DashboardTab';
import ProfileTab from '../components/profile/ProfileTab';
import InfoTab from '../components/profile/InfoTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



export default function HorizontalTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }} component={"div"}>
        <SubNav indexValue={value} handleChange={handleChange}/>
        <TabPanel value={value} index={0}>
            <DashboardTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ProfileTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
            <InfoTab />
        </TabPanel>
    </Box>
  );
}