import { useField } from "@unform/core";
import { useEffect, useRef, useState } from "react";
import StarIcon from "../../assets/star";
import { StarRatingWrapper, Stars } from "./style";

export interface InputProps {
  name: string;
}

const StarRating = ({ name, ...rest }: InputProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name);
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
        setRating(value);
      },
      clearValue: ref => {
        ref.current.value = '';
        setRating(0);
      },
    })
  }, [rating, fieldName, registerField, defaultValue])

  return (
    <StarRatingWrapper className="star-rating">
      <input 
        id={fieldId}
        type="hidden" 
        name={name}
        ref={inputRef}
        value={rating}
        />
      {[...Array(5).keys()].map((index) => {
        index += 1;
        const active = index <= (hover || rating);
        return (
          <Stars
            type="button"
            key={`${name}_${index}`}
            className={active ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <StarIcon 
              stroke={active ? 'transparent' : '#E7A74E'} 
              fill={active ? '#E7A74E' : 'transparent'} 
              width="42" height="42"/>
          </Stars>
        );
      })}
    </StarRatingWrapper>
  );
};

export default StarRating;