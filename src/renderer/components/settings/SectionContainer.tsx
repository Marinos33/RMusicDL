import * as React from 'react';
import ThemeSection from './Sections/ThemeSection';

const SectionContainer: React.FC = () => {
  return (
    <div>
      {/*<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
  </Accordion>*/}
      <ThemeSection />
    </div>
  );
};

export default SectionContainer;
