import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./App.css";

const TableComponent = () => {
  const initialLabel1Options = [
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "AI-powered", label: "AI-powered" },
    { value: "Blockchain", label: "Blockchain" },
  ];

  const [label2Options, setLabel2Options] = useState([
    { value: "Alpha", label: "Alpha" },
    { value: "Beta", label: "Beta" },
    { value: "Gamma", label: "Gamma" },
  ]);

  const getStoredRows = () => {
    const storedRows = localStorage.getItem("tableRows");
    return storedRows ? JSON.parse(storedRows) : [{ id: 1, label1: null, label2: [] }];
  };

  const [rows, setRows] = useState(getStoredRows);

  useEffect(() => {
    localStorage.setItem("tableRows", JSON.stringify(rows));
  }, [rows]);

  const handleLabel1Change = (selectedOption, rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, label1: selectedOption } : row
      )
    );
  };

  const handleLabel2Change = (selectedOptions, rowId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, label2: selectedOptions } : row
      )
    );
  };

  const addRow = () => {
    setRows([...rows, { id: Date.now(), label1: null, label2: [] }]);
  };

  const removeRow = (rowId) => {
    setRows(rows.filter((row) => row.id !== rowId));
  };

  const handleAddNewOption = () => {
    const newOptionLabel = prompt("Enter a new option:");
    if (newOptionLabel && newOptionLabel.trim() !== "") {
      const newOption = {
        value: newOptionLabel.toLowerCase().replace(/\s+/g, "-"),
        label: newOptionLabel,
      };
      setLabel2Options((prevOptions) => [...prevOptions, newOption]);
    }
  };

  const getAvailableLabel1Options = () => {
    const selectedValues = rows.map((row) => row.label1?.value);
    return initialLabel1Options.filter((option) => !selectedValues.includes(option.value));
  };

  return (
    <div className="table-container">
      <h1>React Table Assignment</h1>
      <table>
        <thead>
          <tr>
            <th>Core Technology</th>
            <th>Model Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <Select
                  options={getAvailableLabel1Options()}
                  value={row.label1}
                  onChange={(selectedOption) => handleLabel1Change(selectedOption, row.id)}
                  placeholder="Select one"
                  isSearchable
                />
              </td>
              <td>
                <Select
                  options={[...label2Options, { value: "add_new", label: "➕ Add new option" }]}
                  value={row.label2}
                  onChange={(selectedOptions) => {
                    const lastSelected = selectedOptions[selectedOptions.length - 1];
                    if (lastSelected?.value === "add_new") {
                      handleAddNewOption();
                    } else {
                      handleLabel2Change(selectedOptions, row.id);
                    }
                  }}
                  placeholder="Select multiple"
                  isMulti
                  isSearchable
                />
              </td>
              <td>
                <button className="remove-row-btn" onClick={() => removeRow(row.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row-btn" onClick={addRow}>+ Add New Row</button>
    </div>
  );
};

export default TableComponent;
