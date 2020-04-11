import React from "react";
import { Paper, Avatar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const TextBlock = ({ text, className }) => (
  <Grid item xs>
    <Paper className={className}>{text}</Paper>
  </Grid>
);
const AvatarBlock = ({ avatar }) => <Avatar>{avatar}</Avatar>;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  textBlock: {
    padding: theme.spacing(1),
    margin: theme.spacing(0, 2),
  },
  assistantMsg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.third,
  },
}));

export default function Message({ sender, content }) {
  const classes = useStyles();

  const renderMessage = {
    doctor: (
      <>
        <TextBlock text={content} className={classes.textBlock} />
        <AvatarBlock avatar={sender[0].toUpperCase()} />
      </>
    ),
    assistant: (
      <>
        <AvatarBlock avatar={sender[0].toUpperCase()} />
        <TextBlock
          text={content}
          className={classNames(classes.textBlock, classes.assistantMsg)}
        />
      </>
    ),
  };

  return (
    <Grid container className={classes.root}>
      {renderMessage[sender]}
    </Grid>
  );
}
