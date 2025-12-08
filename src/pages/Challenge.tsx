import {useState, useEffect} from "react";
import Confetti from "react-confetti";
import {DataTable} from "../components/tables/DataTable";
import {TaskChecklist} from "../components/checklist/TaskChecklist";
import {initialData, RowData} from "../constants/initialData";

const tasks = [
  {id: 1, label: "Fix the broken text input"},
  {id: 2, label: "Fix the focus issue"},
  {id: 3, label: "Add delete confirmation dialog"},
  {id: 4, label: "Redesign with Tailwind"},
];

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput1 = ({value, onChange, placeholder}: TextInputProps) => {
  // Note: Keep using displayValue and handleChange pattern - fix the bug without removing this structure
  const displayValue = value || "";

  const handleChange = () => {
    onChange(displayValue);
  };

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

const TextInput2 = ({value, onChange, placeholder}: TextInputProps) => {
  // Note: Keep using the inputKey pattern with the key prop - find out why focus is lost
  const inputKey = `input-${value.length}`;

  return (
    <input
      key={inputKey}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export const Challenge = () => {
  const [rows, setRows] = useState<RowData[]>(initialData);
  const [inputValue1, setInputValue1] = useState<string>("");
  const [inputValue2, setInputValue2] = useState<string>("");
  const [checkedTasks, setCheckedTasks] = useState<number[]>(() => {
    const saved = localStorage.getItem("checkedTasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleTaskToggle = (taskId: number) => {
    let newCheckedTasks: number[];
    if (checkedTasks.includes(taskId)) {
      newCheckedTasks = checkedTasks.filter((id) => id !== taskId);
    } else {
      newCheckedTasks = [...checkedTasks, taskId];
    }
    setCheckedTasks(newCheckedTasks);
    localStorage.setItem("checkedTasks", JSON.stringify(newCheckedTasks));
  };

  const handleAllComplete = () => {
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {showConfetti && <Confetti />}

      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Challenge Page</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Sample (using Tailwind) - No action necessary
            </h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Input:
            </label>
            <input
              type="text"
              placeholder="This one works correctly"
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div style={{marginBottom: "32px"}}>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Task 1</h2>
            <label style={{display: "block", marginBottom: "4px"}}>
              Text Input:
            </label>
            <TextInput1
              value={inputValue1}
              onChange={setInputValue1}
              placeholder="Try typing here..."
            />
          </div>

          <div style={{marginBottom: "32px"}}>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Task 2</h2>
            <label style={{display: "block", marginBottom: "4px"}}>
              Text Input:
            </label>
            <TextInput2
              value={inputValue2}
              onChange={setInputValue2}
              placeholder="Try typing here..."
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Task 3</h2>
            <DataTable rows={rows} onDeleteRow={deleteRow} />
          </div>
        </div>

        <div className="md:w-64 shrink-0">
          <TaskChecklist
            tasks={tasks}
            checkedTasks={checkedTasks}
            onTaskToggle={handleTaskToggle}
            onAllComplete={handleAllComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Challenge;
