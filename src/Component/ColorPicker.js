import React, {Component} from 'react';
import {ChromePicker} from 'react-color';
import onClickOutside from 'react-onclickoutside';

/***
 * @summary
 * main component of the app. Uses redux to track state management for materials added to the list
 * with different functions handling the addition, deletion, and edit materials part of the logic
 * 
 * @return 
 * renders the HTML and CSS wrt to the Redux state. Renders the root page of the application 
 */

class ColorPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pickerVisible: false
        };
    }

    handleClickOutside = () => {
        this.setState({pickerVisible: false});
    };

    handleColorChange = value => {
        this.props.onChange(value.hex);
    };

    popover = {
        position: 'absolute',
        zIndex: 9999
    };

    render() {
        const {value} = this.props;
        const onTogglePicker = () => this.setState({pickerVisible: !this.state.pickerVisible});

        return (

            <div
                style={{
                    width: '40px'
                }}
            >
                <div>
                    <div
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '20px',
                            border: '1px solid #fff',
                            backgroundColor: value || 'red',
                            boxShadow: '0px 0px 7px 0.1px #00ab5580'
                        }}
                        onClick={onTogglePicker}
                    />
                </div>

                {this.state.pickerVisible && (
                    <div style={this.popover}>
                        <ChromePicker color={value || 'red'} onChangeComplete={this.handleColorChange}/>
                    </div>
                )}
            </div>
        );
    }
}

export default onClickOutside(ColorPicker);
