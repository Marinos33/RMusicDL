import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import useSettings from '@src/renderer/hooks/useSettings';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  })
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`
}));

const ThemeSection: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>('panel2');
  const { settings, saveSettings } = useSettings();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleThemeSelected = (event: SelectChangeEvent) => {
    saveSettings('theme', event.target.value);
  };

  return (
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography variant="h6" color="text.primary">
          Theme
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl sx={{ minWidth: 60 }}>
          <Typography variant="subtitle2" color="text.primary">
            Select your prefered theme
          </Typography>
          <Select
            id="theme-selector"
            autoWidth
            value={settings.theme}
            onChange={handleThemeSelected}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={'LIGHT'}>LIGHT</MenuItem>
            <MenuItem value={'BLUE'}>BLUE</MenuItem>
            <MenuItem value={'DARK'}>DARK</MenuItem>
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default ThemeSection;
