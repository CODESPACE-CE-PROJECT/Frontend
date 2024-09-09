"use client"; // Add this at the top

import { useState } from "react";

interface Item {
  id: number;
  content: string;
}

export default function AddItems() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = () => {
    const newItem: Item = {
      id: items.length + 1,
      content: `Item ${items.length + 1}`,
    };
    setItems([...items, newItem]);
  };

  const renderRows = () => {
    // Add a placeholder item for the button
    const itemsWithButton = [...items, { id: -1, content: "Add Item" }];
    const rows = [];

    for (let i = 0; i < itemsWithButton.length; i += 3) {
      const rowItems = itemsWithButton.slice(i, i + 3);
      rows.push(
        <div key={i} className="flex flex-row mb-4">
          {rowItems.map((item) => (
            <div
              key={item.id}
              className={`w-96 ${
                item.id === -1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-4 m-2 cursor-pointer`}
              onClick={item.id === -1 ? addItem : undefined}
            >
              {item.id === -1 ? "Add Item" : item.content}
            </div>
          ))}
        </div>
      );
    }

    return rows;
  };

  return <div className="flex flex-col p-4">{renderRows()}</div>;
}
