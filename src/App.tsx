import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import { initialColumns } from "./components/Col";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";
import styled from "styled-components";
import Data from "./components/data";
import Move from "./components/Move";
import ColumnProps from "./components/IColumn";

const StyleBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
const StyledLeftPlane = styled.div`
width: 100%;
height: 100vh;
background-color: whitesmoke;
position: sticky;
  top: 0;
`;
const StyledPlane = styled.div`
  margin: 10vh auto;
  width: 92.5%;
  height: 100vh;
  gap: 8px;
`;

const StyledControl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 80vh;
  gap: 4px;
  
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 5vh;
  gap: 8px;
  justify-content: center;
`;

const Button = styled.div<{ $reset: boolean }>`
  background-image: linear-gradient(
    to right,
    #485563 0%,
    #29323c 51%,
    #485563 100%
  );
  margin: 10px;
  text-align: center;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  line-height: 5vh;
`;

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  // margin: 10vh auto;
  width: 100%;
  height: 80vh;
  gap: 4px;
  overflow-y: scroll;
`;

for (let i = 0; i < Data.length; i++) {
  initialColumns[i].list = Data[i].list.map((v) => ({
    name: v,
    id: initialColumns[i].id,
    used: false,
  }));
}

function App() {
  let allInformation;
  const data = localStorage.getItem("data");
  if (data != null) allInformation = JSON.parse(data);
  else allInformation = JSON.parse(JSON.stringify(initialColumns));
  const [columns, setColumns] = useState(allInformation);

  // console.log(columns);

  const handleClick = () => {
    localStorage.removeItem("data");
    setColumns(JSON.parse(JSON.stringify(initialColumns)));
  };

  const handleEnsureSelect = () => {
    let selectedMoves: Move[] = columns[0].list;
    selectedMoves.forEach((element) => {
      element.used = true;
    });
    setColumns((state: ColumnProps[]) => {
      selectedMoves.forEach((move) => {
        for (let i = 1; i < state.length; i++) {
          if (state[i].id === move.id) {
            state[i].list.push({ ...move, used: true });
            break;
          }
        }
      });
      state[0].list = [];
      return [...state];
    });
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(columns));
  }, [columns]);

  const onDragStart = ({ type, source }: DragStart) => {
    setColumns((state: ColumnProps[]) => {
      for (let i = 0; i < state.length; i++) {
        if (
          state[i].index !== "0" &&
          state[i].id !== state[source.droppableId].list[source.index].id
        )
          state[i].droppable = false;
        else console.log(state[i].id);
      }
      return [...state];
    });
  };
  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    setColumns((state: ColumnProps[]) => {
      state.forEach((col) => (col.droppable = true));
      return [...state];
    });
    const start = columns[source.droppableId];

    if (destination === undefined || destination === null) {
      if (start.index === "0") {
        const newList = start.list.filter(
          (_: any, idx: number) => idx !== source.index
        );
        const newStartCol = { ...start, list: newList };

        const item = start.list[source.index];
        let end;
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].id === item.id) {
            console.log(columns[i].id, item.id);
            end = columns[i];
            break;
          }
        }
        const newEndList = [...end.list, start.list[source.index]];
        const newEndCol = {
          ...end,
          list: newEndList,
        };
        console.log(newEndList);

        setColumns((state: ColumnProps[]) => {
          for (let i = 0; i < state.length; i++) {
            if (state[i].index == newStartCol.index) state[i] = newStartCol;
            else if (state[i].id == start.list[source.index].id)
              state[i] = newEndCol;
          }
          return [...state];
        });
      }

      return null;
    }

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        ...start,
        list: newList,
      };

      // Update the state
      setColumns((state: ColumnProps[]) => {
        for (let i = 0; i < state.length; i++) {
          if (state[i].index == newCol.index) state[i] = newCol;
        }
        return [...state];
      });

      return null;
    } else {
      if (start.index !== "0" && end.index !== "0") return null;
      else if (start.index === "0" && end.index !== "0") {
        const newList = start.list.filter(
          (_: any, idx: number) => idx !== source.index
        );
        const newStartCol = { ...start, list: newList };

        const item = start.list[source.index];
        let end;
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].id === item.id) {
            console.log(columns[i].id, item.id);
            end = columns[i];
            break;
          }
        }
        const newEndList = [...end.list, start.list[source.index]];
        const newEndCol = {
          ...end,
          list: newEndList,
        };
        console.log(newEndList);

        setColumns((state: ColumnProps[]) => {
          for (let i = 0; i < state.length; i++) {
            if (state[i].index == newStartCol.index) state[i] = newStartCol;
            else if (state[i].id == start.list[source.index].id)
              state[i] = newEndCol;
          }
          return [...state];
        });

        return null;
      }

      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        ...start,
        list: newStartList,
      };

      // Make a new end list array

      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        ...end,
        list: newEndList,
      };

      // Update the state
      setColumns((state: ColumnProps[]) => {
        for (let i = 0; i < state.length; i++) {
          if (state[i].index == newStartCol.index) state[i] = newStartCol;
          else if (state[i].index == newEndCol.index) state[i] = newEndCol;
        }
        return [...state];
      });

      return null;
    }
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <StyleBody>
          <StyledLeftPlane>
          <StyledPlane>
            <StyledControl>
              {
                <>
                  <Column col={columns[0]} key={columns[0].index} />
                  <ButtonContainer>
                    <Button
                      key={"0"}
                      $reset={false}
                      onClick={() => handleEnsureSelect()}
                    >
                      回收此輪組合
                    </Button>
                    <Button
                      key={"1"}
                      $reset={true}
                      onClick={() => handleClick()}
                    >
                      重設
                    </Button>
                  </ButtonContainer>
                  {/* <Column col={columns[0]} key={"-1"} /> */}
                </>
              }
            </StyledControl>
          </StyledPlane>
          </StyledLeftPlane>
          <StyledPlane>
            <StyledColumns>
              {columns
                .filter((col: ColumnProps) => col.index !== "0")
                .map((col: ColumnProps) => (
                  <Column col={col} key={col.index} />
                ))}
            </StyledColumns>
          </StyledPlane>
        </StyleBody>
      </DragDropContext>
    </React.Fragment>
  );
}

export default App;
