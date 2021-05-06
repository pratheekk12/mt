import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ListItemIcon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import config from '../../../ticketing/views/config.json';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  floatRight: {
    float: 'right'
  },
  secondaryText: {
    letterSpacing: 0,
    fontSize: '0.9rem',
    color: theme.palette.grey[700]
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'bold'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: purple[700]
  }
}));

export default function TicketsList() {
  const classes = useStyles();
  const [activeTicket, setActiveTicket] = useState({});
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!activeTicket.ticketNumber) {
      let unmounted = false;
      async function getItems() {
        const response = await fetch(config.APIS_URL + '/tickets');
        const body = await response.json();
        if (!unmounted) {
          var result = []
          setTickets(body.data);
          for (var i = 0; i < 2; i++) {
            result.push(body.data[i])
          }
          setTickets(result)
          if (body.data[0]) {
            setActiveTicket(body.data[0]);
          } else {
            setActiveTicket();
          }

        }
      }
      getItems();
      return () => {
        unmounted = true;
      };
    }
  }, []);
  function getTicketList() {
    return (
      <List to="/#" className={classes.root}>
        {tickets.map((ticket, i) => (
          <div key={i}>
            <ListItem alignItems="flex-start" >
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ListItemIcon>
                      <Avatar
                        className={classes.small}
                        style={{ backgroundColor: ticket.color || purple[700] }}
                      >
                        {ticket.status.substring(0, 1)}
                      </Avatar>
                      <Link to="/#">{ticket.ticketNumber}</Link>
                    </ListItemIcon>
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {ticket.ticketSubject}
                    </Typography>

                    <br />
                    <Typography
                      component="span"
                      variant="subtitle2"
                      className={`${classes.floatRight} ${classes.secondaryText}`}
                    >
                      {new Date(ticket.createdAt).toLocaleString(undefined, {
                        timeZone: 'Asia/Kolkata'
                      })}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </div>
        ))}
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2} alignItems="center">
          <Link
            to="/ticketing/ticket-dashboard"
            className={classes.linkContainer}
          >
            View All
            <ArrowRightIcon />
          </Link>
        </Box>
      </List>
    );
  }
  return (
    <div>{getTicketList()}</div>

  );
}
