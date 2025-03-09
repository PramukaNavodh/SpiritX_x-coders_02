const InputField = ({label, value, onChange}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black">{label}</label>
            <input
                type={label.includes('Password') ? 'password' : 'text'}
                value={value}
                onChange={onChange}
                className="w-full rounded-md text-black bg-gray-50 px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
        </div>
    );
};

export default InputField;