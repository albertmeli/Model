import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
const SubNav = ({indexValue, handleChange}) => {
    function tabIndex(index) {
        return {
          id: `horizontal-tab-${index}`,
          'aria-controls': `horizontal-tabpanel-${index}`,
        };
      }
    return (
        <Tabs
            orientation="horizontal" // Modification de l'orientation
            //variant="fullWidth"      // Modification du variant
            value={indexValue}
            onChange={handleChange}
            aria-label="Horizontal tabs example"
            centered
        >
            <Tab label="Tableau de bord" {...tabIndex(0)} />
            <Tab label="Profile" {...tabIndex(1)} />
            <Tab label="Info" {...tabIndex(2)} />
        </Tabs>
    );
};

export default SubNav;