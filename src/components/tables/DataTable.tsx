import {DeleteButton} from "../buttons/DeleteButton";
import {RowData} from "../../constants/initialData";

interface DataTableProps {
  rows: RowData[];
  onDeleteRow: (id: number) => void;
}

export const DataTable = ({rows, onDeleteRow}: DataTableProps) => {
  // Note: Add a confirmation dialog before deleting - do not use window.confirm or window.alert
  const handleDelete = (id: number) => {
    onDeleteRow(id);
  };

  return (
    <table border={1} cellPadding={8} cellSpacing={0}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Value</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.value}</td>
            <td>
              <DeleteButton onClick={() => handleDelete(row.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
