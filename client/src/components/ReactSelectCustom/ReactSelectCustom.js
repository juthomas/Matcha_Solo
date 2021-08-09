import React from 'react';
import CreatableSelect from 'react-select';
import 'react-select/dist/react-select.css';

function ReactSelectCustom(props)
{
  
  void handleOnChange(value) 
  {
    let difference = this.state.selected.filter(x => !value.includes(x));
    console.log('Removed: ', difference);
    this.setState({ selected: value });
  }
    return (
      <div>
            <CreatableSelect
                isClearable
                isMulti
                value={props.selectedTags}
                onChange ={event => { console.log(event) }}
                isDisabled={!(props.editMod)}
                placeholder={'Tags'}
                options={props.options}/>
      </div>
    );
}

export default ReactSelectCustom