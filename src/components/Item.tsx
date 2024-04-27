import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Move from "./Move";

interface ItemProps {
  move: Move;
  index: number;
}

const colors = {
  "Go Down": "402B3A",
  "Freeze": "265073",
  "Footwork": "2D9596",
  "Power": "416D19",
  "孫振 MIND": "944E63",
  "開場技": "12372A",
  "Back Rock": "3C0753",
};

const StyledItem = styled.div<{$inputColor: string, $isUsed: boolean}>`
  border-radius: 4px;
  padding: 4px 8px;
  transition: background-color .8s ease-out;
  margin-top: 8px;
  color: whitesmoke;
  background-color: #${
    props => colors[props.$inputColor]
  };
  pointer-events: ${props => props.$isUsed?'none':'all'};
  opacity: ${props => props.$isUsed?0.3:1};
  :hover {
    background-color: #fff;
    transition: background-color .1s ease-in;
  }
  
`

const Item: React.FC<ItemProps> = ({ move, index }) => {
  return (
    <Draggable draggableId={move.name} index={index} isDragDisabled={move.used}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $inputColor={move.id}
          $isUsed={move.used}
        >
          {move.name}
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Item;
