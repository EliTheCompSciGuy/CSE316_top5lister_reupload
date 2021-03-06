import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { typography } from "@mui/system";

import Button from '@mui/material/Button';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [newText, setText] = useState(props.text);
    let { index } = props;

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering");
        // setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving");
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        if(sourceId != targetId){
            console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

            // UPDATE THE LIST
            store.addMoveItemTransaction(sourceId, targetId);
        }
        setDraggedTo(false);
    }
    function handleToggleEdit(){
        setEditActive(true);
        store.itemEditActive(true);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            if(newText !== props.text){
                store.addUpdateItemTransaction(props.index, newText);
            }
            setEditActive(false);
            store.itemEditActive(false);
        }
    }
    function handleUpdateText(event) {
        store.updateCurrentListItem(index, event.target.value)
        //store.currentList.items[index] = event.target.value
    }
    


    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let ItemElement = <ListItem
                id={'item-' + (index+1)}
                className={itemClass}
                onDragStart={(event) => {
                    handleDragStart(event, (index+1))
                }}
                onDragOver={(event) => {
                    handleDragOver(event, (index+1))
                }}
                onDragEnter={(event) => {
                    handleDragEnter(event, (index+1))
                }}
                onDragLeave={(event) => {
                    handleDragLeave(event, (index+1))
                }}
                onDrop={(event) => {
                    handleDrop(event, (index+1))
                }}
                draggable="true"
                sx={{ display: 'flex', p: 1, }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton aria-label='edit' onClick={handleToggleEdit}>
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>


if (store.currentList) {
    ItemElement =
        <div style = {{height:"20%"}}>
            <h6 style={{fontSize:"34pt", backgroundColor:"white", width:"5%", textAlign:"center", display: "inline"}}>{index+1}</h6>
            <TextField
                //margin="normal"
                //fullWidth
                size="small" 
                id={"item-" + (index+1)}
                name="name"
                //autoComplete="Top 5 List item"
                // className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 24}}}
                autoFocus
                style={{backgroundColor:"white", width:"80%"}}
            />
        </div>
}
    return ItemElement;
}

export default Top5Item;