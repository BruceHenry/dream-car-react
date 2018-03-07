import React from 'react'

export default class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.state = {
            msg: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value;
        const error = this.props.handleAddOption(option);
        console.log(error)
        this.setState(() => ({ msg: error }))
        e.target.elements.option.value = '';
    }
    handleClear() {
        this.props.handleClear();
    }
    handleRandom() {
        this.props.handleRandom();
    }
    render() {
        return (
            <div className="edit">
                <div className="edit__clear-random">
                    <button
                        onClick={this.handleClear}
                        className="big-button big-button--clear"
                        disabled={!this.props.hasOptions}>
                        Clear
                    </button>
                    <button onClick={this.handleRandom} className="big-button" disabled={!this.props.hasOptions}>Random Choose One</button>
                </div>
                <div>
                    {this.state.msg && <p className="edit__message">{this.state.msg}</p>}
                    <form className="edit__form" onSubmit={this.handleAddOption}>
                        <input className="edit__input" type="text" name="option" />
                        <button className="button">Add Option</button>
                    </form>
                </div>
            </div>
        )
    }
}