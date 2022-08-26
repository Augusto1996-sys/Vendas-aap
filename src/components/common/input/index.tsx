import React, { HtmlHTMLAttributes } from "react";
import { formatReal } from "app/util/money";
import {FormatUtils} from "@4us-dev/utils"


const formatUtils = new FormatUtils()
interface InputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  label: string;
  columnsClasses?: string;
  value: string;
  id: string;
  type?: string;
  error?: string;
  formatter?: (value: string) => String;
}
export const Input: React.FC<InputProps> = ({
  label,
  columnsClasses,
  value,
  id,
  type,
  onChange,
  formatter,
  error,
  ...otherprops
}: InputProps) => {


  const onInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value;

    onChange({
      ...value,
      target: {
        name,
        value: formattedValue,
      },
    });
  };

  return (
    <div className={`field column ${columnsClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          value={value}
          onChange={onInputChange}
          id={id}
          type={type}
          className="input"
          {...otherprops}
        />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};



export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return (
      <Input {...props} formatter={formatReal} />
  )
}

export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
  return (
      <Input {...props} formatter={formatUtils.formatCPF} />
  )
}


export const InputTelefone: React.FC<InputProps> = (props: InputProps) => {
  return (
      <Input {...props} formatter={formatUtils.formatPhone} />
  )
}


export const InputDate: React.FC<InputProps> = (props: InputProps) => {

  const formatData = (value: string) => {
      if(!value){
          return '';
      }

      const data = formatUtils.formatOnlyIntegers(value);
      const size = value.length;

      if(size <= 2){
          return data;
      }

      if(size <= 4){
          return data.substr(0, 2) + "/" + data.substr(2, 2);
      }

      if(size <= 6){
          return data.substr(0,2) + "/" + data.substr(2,2) + "/" + data.substr(4,2)
      }
  }

  return (
      <Input {...props} maxLength={10} formatter={formatData} />
  )
}
