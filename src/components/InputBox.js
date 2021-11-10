import { useState } from "react";
export default function InputBox(props) {
  const [value, setValue] = useState(props.text);

  const onChange = (e) => {
    setValue(e.target.value);
    props.onChange(e);
  };
  return (
    <div {...props}>
      <label className="block text-sm font-medium text-gray-700">{props.headLine ? props.headLine : ""}</label>
      <div className="mt-1">
        <input type="text" name="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" onChange={(e) => onChange(e)} value={value} />
      </div>
    </div>
  );
}
