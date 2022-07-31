import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { ErrorMessage, FormFieldWrapper, Input, Label, LabelText } from './style';

export interface InputProps {
  name: string;
  label?: string;
  type: string;
  shrink?: boolean;
  _defaultValue?: string;
}

export default function InputElement({ name, type, label, _defaultValue, ...rest }: InputProps) {
  const isTypeTextArea = type === 'textarea';
  const tag = isTypeTextArea ? 'textarea' : 'input';
  const inputRef = useRef(null)
  const { fieldName, defaultValue = _defaultValue, registerField, error } = useField(name);
  const [shrink, setShrink] = useState<boolean>(!!defaultValue);
  const fieldId = `id_${name}`;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value;
        setShrink(!!value);
      },
      clearValue: ref => {
        ref.current.value = ''
        setShrink(false);
      },
    })
  }, [fieldName, registerField, defaultValue, setShrink])

  useEffect(()=>{
    const input = inputRef.current;

    function handlerChangeEvent(evt: ChangeEvent) {
      const inputValue = (evt.currentTarget as HTMLInputElement).value;
      setShrink(!!inputValue);
    }

    if (input) {
      /* @ts-ignore */ 
      input.addEventListener('change', handlerChangeEvent);
    }

    return () => {
      if (input) {
        /* @ts-ignore */ 
        input.removeEventListener('focus', handlerChangeEvent); 
      }
    }
  }, [inputRef])
  return <FormFieldWrapper>
    <Label htmlFor={fieldId} className={error ? 'error' : ''}>
      <Input
        id={fieldId}
        as={tag}
        type={type}
        name={name}
        ref={inputRef}
        defaultValue={defaultValue || ""}
        shrink={shrink}
        {...rest}
        />
        <LabelText>
          {label}
          :
        </LabelText>
    </Label>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormFieldWrapper>
};