import React from 'react'
import { Button, ButtonGroup, DropDownButton, DropDownButtonItem,
    SplitButton, SplitButtonItem, Toolbar, ToolbarItem } from '@progress/kendo-react-buttons';


const itemRender = (props) => {

        return (
            <div className='column-select-item' style={{ padding: '3px', width: '100%' }}>
                <input
                style={{ padding: '3px', marginRight: '3px'  }}
                        className="k-checkbox"
                        defaultChecked={props.item.isVisible}
                        id={'checkbox-' + props.item.field}
                        type="checkbox"
                        onChange={e =>  {

                            props.item.updateColumnsState(props.item.field, e.target.checked)}}
                    />
                <label
                    htmlFor={'checkbox-' + props.item.field}
                    className="k-checkbox-label"
                    style={{ marginLeft: '3px', marginRight: '3px' }}
                    >
                    <span style={{ paddingLeft: '10px',  paddingRight: '10px'}}>{props.item.headerName}</span>
                </label>
            </div>
        );
    };
    
    
class ColumnsSelect extends React.Component {


    render() {

        const updateColumnsState = this.props.updateColumnsState;
        const columns = this.props.columns;
        const items = columns.map((c) => {
            return {...c,
                updateColumnsState }
        });

        console.log(items);

        return (
            <DropDownButton 
                itemRender={itemRender}
                items={items}
                iconClass="fa fa-sliders"
                title='Show/hide columns'
                >
                
             </DropDownButton >
        )
    }
}

export default ColumnsSelect;