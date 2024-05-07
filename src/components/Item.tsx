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
  Freeze: "265073",
  Footwork: "2D9596",
  Power: "416D19",
  "孫振 MIND": "944E63",
  開場技: "12372A",
  "Back Rock": "3C0753",
};

const StyledItem = styled.div<{ $inputColor: string; $usedCount: number }>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 4px 8px;
  transition: background-color 0.8s ease-out;
  margin-top: 8px;
  color: whitesmoke;
  background-color: #${(props) => colors[props.$inputColor]};
  // pointer-events: ${(props) => (props.$usedCount == 0 ? "none" : "all")};
  opacity: ${(props) => (props.$usedCount == 0 ? 1 : 1-0.2*props.$usedCount)};
  :hover {
    background-color: #fff;
    transition: background-color 0.1s ease-in;
  }
  position: relative;
`;

const StyledBadge = styled.div<{ $usedCount: number}>`
  display: flex; 
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(1em) translateY(-.5em);
  background-color: whitesmoke;
  border-radius: 15px;
  color: black;
  padding: 0.25rem;
  opacity: 1;
`

const Item: React.FC<ItemProps> = ({ move, index }) => {
  return (
    <Draggable draggableId={move.name} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $inputColor={move.id}
          $usedCount={move.usedCount}
        >
          {move.name}
          <StyledBadge $usedCount={move.usedCount}>使用次數：{move.usedCount}</StyledBadge>
        </StyledItem>
      )}
    </Draggable>
  );
};

export default Item;
