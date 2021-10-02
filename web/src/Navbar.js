import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    customColor: {
        // or hex code, this is normal CSS background-color
        backgroundColor: green[500]
    },
    customHeight: {
        minHeight: 200
    },
    offset: theme.mixins.toolbar
}));

export default function Navbar() {
    const classes = useStyles();
    const [example] = useState("customColor");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";

    return (
        <React.Fragment>
            <AppBar
                color={isCustomColor || isCustomHeight ? "primary" : example}
                className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight
                    }`}
            >
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        My First Blog
                    </Typography>
                    <IconButton>
                        <Link to="/api/posts" className="btn btn-primary">All Posts</Link>
                    </IconButton>
                    <IconButton>
                        <Link to="/api/new" className="btn btn-primary">New Post</Link>
                    </IconButton>
                    <IconButton>
                        <Link to="/api/update" className="btn btn-primary">Update Post</Link>
                    </IconButton>
                    <IconButton>
                        <Link to="/api/delete" className="btn btn-primary">Delete Post</Link>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}
