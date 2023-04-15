import { Dispatch, ReactPropTypes, SetStateAction, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
interface Props {
	value: null | Value[]
	setValue: React.Dispatch<React.SetStateAction<Value[] | null>>
}
interface Value {
	label: string
	value: string
}

const SkillsSelect = ({ value, setValue }: Props) => {
	const [options, setOptions] = useState<Value[]>([])
	const createOption = (label: string) => ({
		label,
		value: label.toLowerCase().replace(/\W/g, ''),
	})
	const handleCreate = (inputValue: string) => {
		const newOption = createOption(inputValue)
		console.log(newOption)
		setOptions((prev) => [...prev, newOption])
		setValue((prev) => (prev !== null ? [...prev, newOption] : [newOption]))
	}
	return (
		<CreatableSelect
			isMulti={true}
			isClearable
			name={'Skils'}
			options={options}
			className="basic-multi-select w-100"
			classNamePrefix="select"
			value={value}
			onCreateOption={handleCreate}
			onChange={(values) => {
				if (Array.isArray(values)) {
					return setValue([...values])
				}
				return setValue([...values])
			}}
		/>
	)
}

export default SkillsSelect
