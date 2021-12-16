import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

type PropsType = {
  title: string;
  thumbnail: string;
  author: string;
  authorURL: string;
  contentTitles: string[];
};

const PlaylistCard: React.FC<PropsType> = ({ title, thumbnail, author, authorURL, contentTitles }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader title={title} />
      <CardMedia component="img" image={thumbnail} alt="thumbnail" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Uploader : {'\n' + author + '\n'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Uploader URL : {'\n' + authorURL + '\n'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Content:</Typography>
          {contentTitles.map((item, index) => {
            return (
              <Typography key={index} paragraph>
                - {item}
              </Typography>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PlaylistCard;
