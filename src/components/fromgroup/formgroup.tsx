import React from "react";
import * as Styled from "./formgroup.styled";



interface Iprops {
  labeltext?: string;
  placeholdertext?: string;
  typetext?: string;
  searchResult: ISearchResult[];
  onSelected?: (value: string) => void;
  onChange: (value: string) => void;
  value?: any;
}

interface ISearchResult {
  name: string;
}

function Label(props: Iprops) {
  const {
    labeltext,
    typetext,
    placeholdertext,
    onSelected,
    onChange,
    value,
    searchResult,
  } = props;
  return (
    <>
      <Styled.LabelContainer>
        <Styled.LabelTag>{labeltext}</Styled.LabelTag>
        <div id="myDropdown" className="dropdown-content">
          <Styled.InputField
            type={typetext}
            placeholder={placeholdertext}
            onChange={(event) => onChange(event.target.value)}
            value={value?.city}
          />
          <Styled.DropdownContainer>
            {value &&
              value?.length > 2 &&
              searchResult.map((item: any) => {
                return (
                  <Styled.Dropdown onClick={() => onSelected && onSelected(item)}>
                    {item.city}
                  </Styled.Dropdown>
                );
              })}
          </Styled.DropdownContainer>
        </div>
      </Styled.LabelContainer>
    </>
  );
}

export default Label;

