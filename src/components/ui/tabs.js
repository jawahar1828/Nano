import React from "react";
import { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  const modifiedChildren = React.Children.map(children, child => {
    if (!child.props) return child;
    if (child.type === TabsList) {
      return React.cloneElement(child, { active, setActive });
    } else if (child.type === TabsContent) {
      return active === child.props.value ? child : null;
    }
    return child;
  });

  return <div>{modifiedChildren}</div>;
}

export function TabsList({ children, active, setActive }) {
  return (
    <div className="flex gap-2 mb-4">
      {React.Children.map(children, child =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, active, setActive }) {
  const isActive = active === value;
  return (
    <button
      onClick={() => setActive(value)}
      className={`px-4 py-2 rounded ${
        isActive ? "bg-blue-600 text-white" : "bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
