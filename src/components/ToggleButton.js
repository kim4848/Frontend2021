/* This example requires Tailwind CSS v2.0+ */
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ToggleButton(e) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(e.checked);
  }, [e.checked]);

  const onChange = (change) => {
    console.log(change);
    e.onChange(!enabled);
    setEnabled(!enabled);
  };
  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  return (
    <Switch.Group>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={classNames(enabled ? "bg-blue-600" : "bg-gray-200", "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500")}
      >
        <span aria-hidden="true" className={classNames(enabled ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200")} />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900 normal-case">{capitalize(e.text)}</span>
      </Switch.Label>
    </Switch.Group>
  );
}
