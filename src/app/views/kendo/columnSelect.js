import React from 'react'
import { Button, ButtonGroup, DropDownButton, DropDownButtonItem,
    SplitButton, SplitButtonItem, Toolbar, ToolbarItem } from '@progress/kendo-react-buttons';


const itemRender = (props) => {

        return (
            <div>
                <input
                        className="k-checkbox"
                        defaultChecked={!props.item.hide}
                        id={'checkbox-' + props.item.field}
                        type="checkbox"
                        onChange={e =>  {
                            console.log(e)
                            console.log(props)
                            props.item.updateColumnsState(props.item.field, e.target.checked)}}
                    />
                <label
                    htmlFor={'checkbox-' + props.item.field}
                    className="k-checkbox-label"
                >
                    {props.item.title}
                </label>
            </div>
        );
    };
    
    
class ColumnsSelect extends React.Component {


    render() {
        console.log("cselect: ")
        console.log(this.props)
        const updateColumnsState = this.props.updateColumnsState;
        const columns = this.props.columns;
        const items = columns.map((c) => {
            return {...c,
                updateColumnsState }
        });
        console.log(items)
        return (
            <DropDownButton 
                itemRender={itemRender}
                items={items}
                icon="columns" 
                >
                
             </DropDownButton >
        )
    }
}

export default ColumnsSelect;