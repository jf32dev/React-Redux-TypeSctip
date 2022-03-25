import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
};

export const Default = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    
    const handleChange = () => {
        setIsChecked(c => !c)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
            <Checkbox label="I am ticking this box to confirm something very important." checked={isChecked} onChange={handleChange}/>
      </div>
    )
};
