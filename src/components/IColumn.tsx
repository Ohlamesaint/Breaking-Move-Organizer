import Move from "./Move";

interface ColumnProps {
  id: string;
  list: Move[];
  index: string;
  color: string;
  droppable: boolean;
}

export default ColumnProps;
