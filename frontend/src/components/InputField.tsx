import { ChangeEvent } from "react";


export const InputField = ({label, placeholder, type, onChange}: {label: string, placeholder: string, type: string, onChange: (e: ChangeEvent<HTMLInputElement>, label: string) => void}) => {

    return (
        <div>
            <label className="block mb-2 text-2xl font-medium text-gray-900">{`${label[0].toUpperCase() + label.slice(1)}`}</label>
            <input type={type} 
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                   placeholder={placeholder}
                   onChange={(e) => onChange(e, label)}/>
        </div>
    )
}